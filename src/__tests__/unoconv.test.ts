import { spawn } from 'child_process';
import debugFactory from 'debug';

import { DebugFactoryMock, DebugMock } from '../types';
import unoconv, { prepareCommandArgs } from '../unoconv';

jest.mock('child_process', () => ({
  __esModule: true,
  spawn: jest.fn().mockReturnValue({
    on: jest.fn(),
    stdout: {
      on: jest.fn(),
    },
    stderr: {
      on: jest.fn(),
    },
  }),
}));

const spawnMock = <jest.Mock>spawn;
const debugFactoryMock = <DebugFactoryMock>debugFactory;

afterEach(() => {
  jest.clearAllMocks();
});

describe('prepareCommandArgs', () => {
  it('returns an empty array if passed object is empty', () => {
    const args = prepareCommandArgs({});

    expect(args).toEqual([]);
  });

  it('returns an empty array if passed object constains only an argument that is not defined', () => {
    const options = { foo: 'bar' };
    const args = prepareCommandArgs(options);

    expect(args).toEqual([undefined, 'bar']);
  });

  it('adds only one element to an array if the argument type is boolean', () => {
    const options = { listener: true };
    const args = prepareCommandArgs(options);

    expect(args).toEqual(['-l']);
  });

  it('retruns an array of command arguments', () => {
    const options = {
      format: 'pdf',
      output: 'bar.pdf',
      server: '//host',
      port: '20',
    };
    const args = prepareCommandArgs(options);

    expect(args).toEqual(['-f', 'pdf', '-o', 'bar.pdf', '--server', '//host', '-p', '20']);
  });
});

describe('Unoconv', () => {
  const closeChildProcess = (code?: string): void => {
    const { value: childProcess } = spawnMock.mock.results[0];
    const { 1: onCloseCallback } = childProcess.on.mock.calls[0];

    if (typeof onCloseCallback === 'function') {
      onCloseCallback(code);
    }
  };

  const getDebugMock = (): jest.Mock => <jest.Mock>debugFactoryMock.debugMock;

  it('enables debug mode', () => {
    unoconv({ debug: true });

    const debugEnable = <jest.Mock>debugFactory.enable;
    expect(debugEnable.mock.calls[0][0]).toContain('node-unoconv');
  });

  it('logs debug message about spawning a child process', () => {
    unoconv({ debug: true });

    expect(getDebugMock().mock.calls[0][0]).toBe('Running command: unoconv -f pdf --stdout');
  });

  it('returns a child process object', () => {
    const callback = () => {};
    const cp = unoconv({ callback });

    expect(cp).toMatchObject({
      on: expect.any(Function),
      stdout: {
        on: expect.any(Function),
      },
      stderr: {
        on: expect.any(Function),
      },
    });
  });

  it('resolves a child process object when no callback is passed', (done) => {
    const promise = unoconv({});

    promise.then((data: any) => {
      expect(data).toBeInstanceOf(Buffer);

      expect(getDebugMock().mock.calls[1]).toMatchObject(['node-unoconv finished with code: %s', '123']);

      done();
    });

    closeChildProcess('123');
  });

  describe('spawns a child process', () => {
    it('call unoconv with a default argument list if no options are passed', () => {
      unoconv({});

      expect(spawnMock.mock.calls[0]).toEqual(['unoconv', ['-f', 'pdf', '--stdout']]);
    });

    it('call unoconv with an input', () => {
      const input = 'foo.bar';
      unoconv({ input });

      expect(spawnMock.mock.calls[0]).toEqual(['unoconv', ['-f', 'pdf', '--stdout', 'foo.bar']]);
    });

    it('calls unoconv without --stdout option if output path is passed', () => {
      const output = 'output.pdf';
      unoconv({ output });

      expect(spawnMock.mock.calls[0]).toEqual(['unoconv', ['-f', 'pdf', '-o', 'output.pdf']]);
    });
  });

  it('calls a callback with a Buffer', async () => {
    const promise = unoconv({});

    const { value: childProcess } = spawnMock.mock.results[0];
    const { 1: stdoutCallback } = childProcess.stdout.on.mock.calls[0];

    const arr = [
      new Uint8Array(1),
      new Uint8Array(2),
      new Uint8Array(3)
    ];

    stdoutCallback(arr[0]);
    stdoutCallback(arr[1]);
    stdoutCallback(arr[2]);

    closeChildProcess();
    const bufferToTest = Buffer.concat(arr);

    const buffer = await promise;
    expect(buffer).toBeInstanceOf(Buffer);


    expect(buffer).toMatchObject(bufferToTest);
  });

  it('calls a callback with a Buffer', () => {
    const promise = unoconv({});

    const { value: childProcess } = spawnMock.mock.results[0];
    const { 1: stderrCallback } = childProcess.stderr.on.mock.calls[0];

    const arr = [
      Uint8Array.from([...'Hello '].map(ch => ch.charCodeAt(0))),
      Uint8Array.from([...'World'].map(ch => ch.charCodeAt(0))),
      Uint8Array.from([...'!'].map(ch => ch.charCodeAt(0)))
    ];

    stderrCallback(arr[0]);
    stderrCallback(arr[1]);
    stderrCallback(arr[2]);

    closeChildProcess();
    const bufferToTest = Buffer.concat(arr);

    return promise.catch((err: Error) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('Hello World!');

      expect(getDebugMock().mock.calls[2]).toMatchObject(['%o', expect.any(Error)]);
    });
  });

  it('logs a message to the console when child_process send an error message', async () => {
    const promise = unoconv({});

    const { value: childProcess } = spawnMock.mock.results[0];
    const { 1: errorCallback } = childProcess.on.mock.calls[1];

    const err = new Error('foo');

    errorCallback(err);

    expect(getDebugMock().mock.calls[1]).toMatchObject(['%o', err]);
  });

  it('logs a message to the console when child_process throws ENOENT error', async () => {
    const promise = unoconv({});

    const { value: childProcess } = spawnMock.mock.results[0];
    const { 1: errorCallback } = childProcess.on.mock.calls[1];

    const err = new Error('ENOENT');

    errorCallback(err);

    expect(getDebugMock().mock.calls[1]).toMatchObject(['unoconv command not found. %o', err]);
  });
});
