import { Options } from './types';
import unoconv from './unoconv';

const convert = (input: string, options: Options = {}): void => {
  const unoconvOptions: Options = {
    ...options,
    input,
  };

  return unoconv(unoconvOptions);
};

export default convert;
