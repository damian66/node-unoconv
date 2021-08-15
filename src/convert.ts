import { Options, ReturnOutput } from './types';
import unoconv from './unoconv';

const convert = (input: string, options: Options = {}): ReturnOutput => {
  const unoconvOptions: Options = {
    ...options,
    input,
  };

  return unoconv(unoconvOptions);
};

export default convert;
