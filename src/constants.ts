import { CommandArguments, Options } from './types';

export const COMMAND_ARGUMENTS: CommandArguments = {
  connection: '-c',
  disableHtmlUpdateLinks: '--disable-html-update-links',
  doctype: '-d',
  export: '-e',
  field: '-F',
  format: '-f',
  import: '-i',
  importFilterName: '-I',
  listener: '-l',
  noLaunch: '-n',
  output: '-o',
  password: '--password',
  pipe: '--pipe',
  port: '-p',
  preserve: '--preserve',
  printer: '--printer',
  server: '--server',
  show: '--show',
  stdin: '--stdin',
  stdout: '--stdout',
  template: '-t',
  timeout: '-T',
  unsafeQuietUpdate: '--unsafe-quiet-update',
  userProfile: '--user-profile',
  verbose: '--verbose',
};

export const DEFAULT_OPTIONS: Options = {
  format: 'pdf',
  stdout: true,
};

export default {
  COMMAND_ARGUMENTS,
};
