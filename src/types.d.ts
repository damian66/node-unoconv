export type CommandArguments = {
  [key: string]: string
};

export type Callback = (output: Buffer) => void;

export type OptionValues = string | string[] | number | boolean | Callback;

export type Options = {
  [key: string]: OptionValues,
  callback?: Callback,
  connection?: string,
  disableHtmlUpdateLinks?: boolean,
  doctype?: string,
  export?: string | string[],
  field?: string | string[],
  format?: string,
  import?: string,
  importFilterName?: string,
  input?: string,
  listener?: boolean,
  noLaunch?: boolean,
  output?: string,
  password?: string,
  pipe?: string,
  port?: number | string,
  preserve?: boolean,
  printer?: string | string[],
  server?: string,
  show?: boolean,
  stdin?: boolean,
  stdout?: boolean,
  template?: string,
  timeout?: number,
  unsafeQuietUpdate?: boolean,
  userProfile?: string,
  verbose?: boolean,
};

export type MixedFunctionArguments = (string | Options)[];

export type ReturnOutput = Promise<string | Buffer>;
