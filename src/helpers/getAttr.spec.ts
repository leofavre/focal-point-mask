import getAttr from './getAttr';
let element: HTMLElement;

describe('getAttr', () => {
  beforeEach(() => {
    element = {} as unknown as HTMLElement;
  });

  it('should return getAttribute result', () => {
    element.getAttribute = () => '500';
    expect(getAttr(element, 'height')).toBe('500');
  });

  it('should return undefined instead of null', () => {
    element.getAttribute = () => null;
    expect(getAttr(element, 'height')).toBeUndefined();
  });
});
