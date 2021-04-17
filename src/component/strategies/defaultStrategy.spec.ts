import defaultStrategy from './defaultStrategy';

const divElement = {
  nodeName: 'DIV'
} as unknown as HTMLImageElement;

const maskElement = {
  querySelector: () => divElement
} as unknown as HTMLElement;

const maskElementWithoutChild = {
  querySelector: () => null
} as unknown as HTMLElement;

describe('defaultStrategy', () => {
  describe('getTarget', () => {
    it('should return the correct target', () => {
      expect(defaultStrategy.getTarget(maskElement)).toBe(divElement);
    });

    it('should return null if target is not found', () => {
      expect(defaultStrategy.getTarget(maskElementWithoutChild)).toBeNull();
    });

    it('should return false if it receives null', () => {
      expect(defaultStrategy.getTarget(null)).toBeNull();
    });
  });

  describe('isMatch', () => {
    it('should return true', () => {
      expect(defaultStrategy.isMatch(maskElement)).toBe(true);
    });
  });

  describe('isReady', () => {
    it('should return true', () => {
      expect(defaultStrategy.isReady(maskElement)).toBe(true);
    });
  });
});
