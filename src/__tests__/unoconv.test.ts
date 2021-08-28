import { prepareCommandArgs } from '../unoconv';

// jest.mock('../unoconv.ts');

describe('prepareCommandArgs', () => {
  it('returns an empty array if passed object is empty', () => {
    const args = prepareCommandArgs({});

    expect(args).toEqual([]);
  });

  it('returns an empty array if passed object constains only an argument that is not defined', () => {
    const options = { foo: 'bar' };
    const args = prepareCommandArgs(options);

    expect(args).toEqual([undefined, 'bar']);
  });

  it('adds only one element to an array if the argument type is boolean', () => {
    const options = { listener: true };
    const args = prepareCommandArgs(options);

    expect(args).toEqual(['-l']);
  });

  it('retruns an array of command arguments', () => {
    const options = {
      format: 'pdf',
      output: 'bar.pdf',
      server: '//host',
      port: '20',
    };
    const args = prepareCommandArgs(options);

    expect(args).toEqual(['-f', 'pdf', '-o', 'bar.pdf', '--server', '//host', '-p', '20']);
  });
});
