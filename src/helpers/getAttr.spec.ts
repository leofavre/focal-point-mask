import getAttr from './getAttr';
let element: HTMLElement;

describe('getAttr', () => {
  beforeEach(() => {
    element = {
      getAttribute: jest.fn(() => '500')
    } as unknown as HTMLElement;
  });

  it('should call String with the result o getAttribute and return it', () => {
    expect(getAttr(element, 'height')).toBe('500');
  });

  it('should call the use cast function with the result o getAttribute', () => {
    expect(getAttr<string, number>(element, 'height', Number)).toBe(500);
  });
});
