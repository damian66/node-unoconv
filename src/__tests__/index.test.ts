import defaultConvert from '..';
import convert from '../convert';

jest.mock('../convert.ts', () => ({
  __esModule: true,
  default: jest.fn(),
}));

beforeEach(() => {
  (<jest.Mock>convert).mockClear();
});

describe('Default export', () => {
  it('calls unoconv command', async () => {
    const inputString = 'foo.txt';
    await defaultConvert(inputString);

    expect((<jest.Mock>convert).mock.calls[0]).toEqual([inputString, {}]);
  });

  it('passes both input and options arguments to convert function', async () => {
    const inputString = 'bar.txt';
    const options = {
      abc: 'def',
      foo: 'bar',
    };
    await defaultConvert(inputString, options);

    expect((<jest.Mock>convert).mock.calls[0]).toEqual([inputString, options]);
  });
});
