import listen from '../listen';
import unoconv from '../unoconv';

jest.mock('../unoconv.ts');

describe('Listen', () => {
  it('calls unoconv command with listener option', async () => {
    await listen();

    expect(unoconv).toBeCalledWith({
      listener: true,
    });
  });

  it('passes options to unoconv command', async () => {
    const options = {
      abc: 'def',
      foo: 'bar',
    };
    await listen(options);

    expect(unoconv).toBeCalledWith({
      ...options,
      listener: true,
    });
  });
});
