import { spawn } from 'child_process';

import unoconv, { prepareCommandArgs } from '../unoconv';

const spawnMock = <jest.Mock>spawn;

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

beforeEach(() => {
  spawnMock.mockClear();
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
  // const closeChildProcess = () => {
  //   const { value: childProcess } = spawnMock.mock.results[0];
  //   const { 1: onCloseCallback } = childProcess.on.mock.calls[0];

  //   console.log(onCloseCallback);
  //   if (typeof onCloseCallback === 'function') {
  //     onCloseCallback();
  //   }
  // };

  it('spawns a child process and call unoconv with a default argument list if no options are passed', () => {
    unoconv({});

    expect(spawnMock.mock.calls[0]).toEqual(['unoconv', ['-f', 'pdf', '--stdout']]);
  });
});
