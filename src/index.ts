import { Options } from './types';
import listen from './listen';
import convert from './convert';

export {
  convert,
  listen,
};

const defaultExport = function unoconv(input: string, options: Options): void {
  return convert(input, options);
};

defaultExport.prototype = {
  convert,
  listen,
};

export default defaultExport;
