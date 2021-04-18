import setAttr from './setAttr';
let element: HTMLElement;

describe('setAttr', () => {
  beforeEach(() => {
    element = {
      removeAttribute: jest.fn(),
      setAttribute: jest.fn()
    } as unknown as HTMLElement;
  });

  it('should call setAttribute with the attribute name and the unprocessed value if it is a number', () => {
    setAttr(element, 'height', 20);
    expect(element.setAttribute).toHaveBeenCalledWith('height', '20');
  });

  it('should call setAttribute with the attribute name and the unprocessed value if it is zero', () => {
    setAttr(element, 'height', 0);
    expect(element.setAttribute).toHaveBeenCalledWith('height', '0');
  });

  it('should call setAttribute with the attribute name and the unprocessed value if it is a string', () => {
    setAttr(element, 'height', '20px');
    expect(element.setAttribute).toHaveBeenCalledWith('height', '20px');
  });

  it('should call setAttribute with the attribute name and an empty string if the value is true', () => {
    setAttr(element, 'height', true);
    expect(element.setAttribute).toHaveBeenCalledWith('height', '');
  });

  it('should call removeAttribute with the attribute name if the value is null', () => {
    setAttr(element, 'height', null);
    expect(element.removeAttribute).toHaveBeenCalledWith('height');
  });

  it('should call removeAttribute with the attribute name if the value is undefined', () => {
    setAttr(element, 'height', undefined);
    expect(element.removeAttribute).toHaveBeenCalledWith('height');
  });

  it('should call removeAttribute with the attribute name if the value is false', () => {
    setAttr(element, 'height', false);
    expect(element.removeAttribute).toHaveBeenCalledWith('height');
  });
});
