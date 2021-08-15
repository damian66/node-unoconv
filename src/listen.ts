import { Options, ReturnOutput } from './types';
import unoconv from './unoconv';

const listen = (options: Options = {}): ReturnOutput => {
  const unoconvOptions: Options = {
    ...options,
    listener: true,
  };

  return unoconv(unoconvOptions);
};

export default listen;
