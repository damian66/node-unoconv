import debugFactory from 'debug';

export type CommandArguments = {
  [key: string]: string
};

export type Callback = (error: Error | null, output?: Buffer | string | undefined) => void;

export type OptionMultiple = string[] | number[] | { [key: string]: string | number };

export type OptionValues = string | number | boolean | Callback | OptionMultiple;

export type Options = {
  [key: string]: OptionValues,
  callback?: Callback,
  connection?: string,
  disableHtmlUpdateLinks?: boolean,
  doctype?: string,
  export?: string | OptionMultiple,
  field?: string | OptionMultiple,
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
  printer?: string | OptionMultiple,
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

export type ReturnOutput = ChildProcessWithoutNullStreams | Promise<string | Buffer>;

export interface DebugMock extends Partial(debugFactory.Debugger), Partial<jest.Mock> {
  debug?: () => void;
  default?: () => void;
}

export interface DebugFactoryMock extends Partial<jest.Mock> {
  (...args): DebugMock;
  enable?: ((namespaces: string) => void) | jest.Mock;
  debugMock?: DebugMock;
};
