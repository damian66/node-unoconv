import defaultConvert from '..';
import convert from '../convert';

jest.mock('../convert.ts');

describe('Default export', () => {
  it('calls unoconv command', async () => {
    const inputString = 'foo.txt';
    await defaultConvert(inputString);

    expect(convert).toBeCalledWith(inputString);
  });

  it('passes both input and options arguments to convert function', async () => {
    const inputString = 'bar.txt';
    const options = {
      abc: 'def',
      foo: 'bar',
    };
    await defaultConvert(inputString, options);

    expect(convert).toBeCalledWith(inputString, options);
  });
});
