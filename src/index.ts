import { Options, ReturnOutput } from './types';
import listen from './listen';
import convert from './convert';

export {
  convert,
  listen,
};

const defaultExport = function unoconv(input: string, options: Options): ReturnOutput {
  return convert(input, options);
};

defaultExport.prototype = {
  convert,
  listen,
};

export default defaultExport;
