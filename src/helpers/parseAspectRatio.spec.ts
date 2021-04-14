import parseAspectRatio from './parseAspectRatio';

describe('parseAspectRatio', () => {
  it('should correctly parse 2/1', () => {
    expect(parseAspectRatio('2/1')).toBe(2 / 1);
  });

  it('should correctly parse 16/9', () => {
    expect(parseAspectRatio('16/9')).toBe(16 / 9);
  });

  it('should correctly parse 16 / 9', () => {
    expect(parseAspectRatio('16 / 9')).toBe(16 / 9);
  });

  it('should correctly parse 1', () => {
    expect(parseAspectRatio('1')).toBe(1 / 1);
  });

  it('should correctly parse 2', () => {
    expect(parseAspectRatio('2')).toBe(2 / 1);
  });

  it('should correctly parse 1.5', () => {
    expect(parseAspectRatio('1.5')).toBe(1.5 / 1);
  });

  it('should correctly parse 5/2.5', () => {
    expect(parseAspectRatio('5/2.5')).toBe(5 / 2.5);
  });

  it('should correctly parse 1.888/7', () => {
    expect(parseAspectRatio('1.888/7')).toBe(1.888 / 7);
  });

  it('should correctly parse 1.888/2.5', () => {
    expect(parseAspectRatio('1.888/2.5')).toBe(1.888 / 2.5);
  });

  it('should return undefined given 3/-2', () => {
    expect(parseAspectRatio('3/-2')).toBeUndefined();
  });

  it('should return undefined given -3/2', () => {
    expect(parseAspectRatio('-3/2')).toBeUndefined();
  });

  it('should return undefined given -3/-2', () => {
    expect(parseAspectRatio('-3/-2')).toBeUndefined();
  });

  it('should return undefined given /5', () => {
    expect(parseAspectRatio('/5')).toBeUndefined();
  });

  it('should return undefined given 2/0', () => {
    expect(parseAspectRatio('2/0')).toBeUndefined();
  });

  it('should return undefined given 2/-0', () => {
    expect(parseAspectRatio('2/-0')).toBeUndefined();
  });

  it('should return undefined given 0/2', () => {
    expect(parseAspectRatio('0/2')).toBeUndefined();
  });

  it('should return undefined given 0', () => {
    expect(parseAspectRatio('0')).toBeUndefined();
  });

  it('should return undefined given 16/9/1', () => {
    expect(parseAspectRatio('16/9/1')).toBeUndefined();
  });

  it('should return undefined given a non-numeric value', () => {
    expect(parseAspectRatio('bogus')).toBeUndefined();
  });

  it('should return undefined given a non-numeric value with a slash', () => {
    expect(parseAspectRatio('bog/us')).toBeUndefined();
  });

  it('should return undefined without parameters', () => {
    expect(parseAspectRatio()).toBeUndefined();
  });
});
