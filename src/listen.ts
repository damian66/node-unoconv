import { Options } from './types';
import unoconv from './unoconv';

const listen = (options: Options = {}): void => {
  const unoconvOptions: Options = {
    ...options,
    listener: true,
  };

  return unoconv(unoconvOptions);
};

export default listen;
