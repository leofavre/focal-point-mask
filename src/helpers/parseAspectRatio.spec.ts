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

  it('should return undefined for 3/-2', () => {
    expect(parseAspectRatio('3/-2')).toBeUndefined();
  });

  it('should return undefined for -3/2', () => {
    expect(parseAspectRatio('-3/2')).toBeUndefined();
  });

  it('should return undefined for -3/-2', () => {
    expect(parseAspectRatio('-3/-2')).toBeUndefined();
  });

  it('should return undefined for /5', () => {
    expect(parseAspectRatio('/5')).toBeUndefined();
  });

  it('should return undefined for 2/0', () => {
    expect(parseAspectRatio('2/0')).toBeUndefined();
  });

  it('should return undefined for 2/-0', () => {
    expect(parseAspectRatio('2/-0')).toBeUndefined();
  });

  it('should return undefined for 0/2', () => {
    expect(parseAspectRatio('0/2')).toBeUndefined();
  });

  it('should return undefined for 0', () => {
    expect(parseAspectRatio('0')).toBeUndefined();
  });

  it('should return undefined if empty', () => {
    expect(parseAspectRatio()).toBeUndefined();
  });
});
