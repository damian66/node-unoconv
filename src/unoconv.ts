/* eslint-disable @typescript-eslint/no-unused-vars */
import debugFactory from 'debug';

import { spawn, ChildProcess } from 'child_process';
import { COMMAND_ARGUMENTS, DEFAULT_OPTIONS } from './constants';
import {
  Callback, Options,
  OptionValues, ReturnOutput,
} from './types';

const debug = debugFactory('node-unoconv:command');

export const prepareCommandArgs = (options: Options = {}): string[] => {
  const {
    callback,
    debug: debug_,
    input,
    ...opts
  } = options;
  const args: string[] = [];
  const keys: string[] = Object.keys(opts);

  for (const keyIndex in keys) {
    const key: string = keys[keyIndex];
    const argName: string = COMMAND_ARGUMENTS[key];
    const argValue: OptionValues = opts[key];

    switch (typeof argValue) {
      case 'boolean':
        if (argValue) {
          args.push(argName);
        }
        break;
      case 'object':
        if (Array.isArray(argValue)) {
          for (const index in argValue) {
            args.push(argName, String(argValue[index]));
          }
        } else {
          const arr = Object.keys(argValue);
          for (const index in arr) {
            const key = arr[index];
            const value = `${key}=${String(argValue[key])}`;
            args.push(argName, value);
          }
        }
        break;
      case 'string':
      default:
        args.push(argName, String(argValue));
        break;
    }
  };

  if (input) {
    args.push(input);
  }

  return args;
};

const run = (options: Options): ChildProcess => {
  const stdout: Uint8Array[] = [];
  const stderr: Uint8Array[] = [];

  const { callback = (() => null) as Callback } = options;

  const cmdOptions: Options = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  if (options.debug) {
    debugFactory.enable('node-unoconv:*');
  }

  if (options.output) {
    cmdOptions.stdout = false;
  }

  const args = prepareCommandArgs(cmdOptions);

  debug(`Running command: unoconv ${args.join(' ')}`);
  const childProcess = spawn('unoconv', args);

  childProcess.stdout.on('data', (data: Uint8Array) => {
    stdout.push(data);
  });

  childProcess.stderr.on('data', (data: Uint8Array) => {
    stderr.push(data);
  });

  childProcess.on('close', (code: string) => {
    debug('node-unoconv finished with code: %s', code);
    if (stderr.length) {
      const error = new Error(Buffer.concat(stderr).toString('utf8'));
      debug('%o', error);
      callback(error);
      return;
    }

    const result = options.output || Buffer.concat(stdout);
    callback(null, result);
  });

  childProcess.on('error', (err: Error) => {
    if (err.message.indexOf('ENOENT') > -1) {
      debug('unoconv command not found. %o', err);
      return;
    }

    debug('%o', err);
  });

  return childProcess;
};

const unoconv = (options: Options): ReturnOutput => {
  if (!options.callback) {
    // Return a promise if there is no callback
    return new Promise((resolve, reject) => {
      // Assign a fake callback that would either resolve or reject the promise
      options.callback = (err, result) => {
        return err
        ? reject(err)
        : resolve(result);
    }

      return run(options);
    });
  }

  return run(options);
};

export default unoconv;
