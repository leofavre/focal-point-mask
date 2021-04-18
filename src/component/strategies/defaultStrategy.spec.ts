import defaultStrategy from './defaultStrategy';

const divElement = {
  nodeName: 'DIV',
  clientWidth: 30,
  clientHeight: 20
} as unknown as HTMLElement;

const maskElement = {
  querySelector: () => divElement
} as unknown as HTMLElement;

const maskWithAspectRatioInfinity = {
  querySelector: () => ({ ...divElement, clientHeight: 0 })
} as unknown as HTMLElement;

const maskWithAspectRatioZero = {
  querySelector: () => ({ ...divElement, clientWidth: 0 })
} as unknown as HTMLElement;

const maskWithAspectRatioNaN = {
  querySelector: () => ({ ...divElement, clientWidth: 0, clientHeight: 0 })
} as unknown as HTMLElement;

const emptyMaskElement = {
  querySelector: () => null
} as unknown as HTMLElement;

describe('defaultStrategy', () => {
  describe('getTarget', () => {
    it('should return the correct target', () => {
      expect(defaultStrategy.getTarget(maskElement)).toBe(divElement);
    });

    it('should return null if target is not found', () => {
      expect(defaultStrategy.getTarget(emptyMaskElement)).toBeNull();
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

  describe('getRatio', () => {
    it('should return the correct target aspect ratio', () => {
      expect(defaultStrategy.getRatio(maskElement)).toBe(30 / 20);
    });

    it('should return undefined for incalculable aspect ratios', () => {
      expect(defaultStrategy.getRatio(maskWithAspectRatioInfinity))
        .toBeUndefined();

      expect(defaultStrategy.getRatio(maskWithAspectRatioZero))
        .toBeUndefined();

      expect(defaultStrategy.getRatio(maskWithAspectRatioNaN))
        .toBeUndefined();
    });

    it('should return undefined if it receives null', () => {
      expect(defaultStrategy.getRatio(null)).toBeUndefined();
    });
  });
});
