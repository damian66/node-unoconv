/* eslint-disable @typescript-eslint/no-unused-vars */
import debugFactory from 'debug';

import { spawn } from 'child_process';
import { Callback, Options, OptionValues } from './types';
import { COMMAND_ARGUMENTS, DEFAULT_OPTIONS } from './constants';

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

  keys.forEach((key: string) => {
    const argName: string = COMMAND_ARGUMENTS[key];
    const argValue: OptionValues = opts[key];

    switch (typeof argValue) {
      case 'boolean':
        args.push(argName);
        break;
      case 'string':
      default:
        args.push(argName, String(argValue));
        break;
    }
  });

  if (debug_) {
    args.push('-vvv');
  }

  if (input) {
    args.push(input);
  }

  return args;
};

const unoconv = (options: Options): void => {
  const stdout: Uint8Array[] = [];
  const stderr: Uint8Array[] = [];

  const { callback = (() => null) as Callback } = options;

  const cmdOptions: Options = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const args = prepareCommandArgs(cmdOptions);

  debug(`Running command: unoconv ${args.join(' ')}`);
  const childProcess = spawn('unoconv', args);

  childProcess.on('error', (err: Error) => {
    if (err.message.indexOf('ENOENT') > -1) {
      debug('unoconv command not found. %o', err);
    }

    debug('%o', err);
  });

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
      debug(error);
      return;
    }
    callback(Buffer.concat(stdout));
  });
};

export default unoconv;
