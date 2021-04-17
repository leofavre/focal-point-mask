import imageStrategy from './imageStrategy';

const imageElement = {
  nodeName: 'IMG',
  complete: true,
  naturalWidth: 30,
  naturalHeight: 20,
  addEventListener: (attr: string, callback: () => void): void => callback()
} as unknown as HTMLImageElement;

const maskElement = {
  querySelector: () => imageElement
} as unknown as HTMLElement;

const maskElementWithUnexpectedChild = {
  querySelector: () => ({ ...imageElement, nodeName: 'DIV' })
} as unknown as HTMLElement;

const maskElementWithUnreadyTarget = {
  querySelector: () => ({
    ...imageElement,
    complete: false,
    naturalWidth: 0,
    naturalHeight: 0
  })
} as unknown as HTMLElement;

const emptyMaskElement = {
  querySelector: () => null
} as unknown as HTMLElement;

describe('imageStrategy', () => {
  describe('getTarget', () => {
    it('should return the correct target', () => {
      expect(imageStrategy.getTarget(maskElement)).toBe(imageElement);
    });

    it('should return null if target is not found', () => {
      expect(imageStrategy.getTarget(emptyMaskElement)).toBeNull();
    });

    it('should return false if it receives null', () => {
      expect(imageStrategy.getTarget(null)).toBeNull();
    });
  });

  describe('isMatch', () => {
    it('should return true if target is the expected type', () => {
      expect(imageStrategy.isMatch(maskElement)).toBe(true);
    });

    it('should return false if target is not found', () => {
      expect(imageStrategy.isMatch(emptyMaskElement)).toBe(false);
    });

    it('should return false if target is not the expected type', () => {
      expect(imageStrategy.isMatch(maskElementWithUnexpectedChild)).toBe(false);
    });

    it('should return false if it receives null', () => {
      expect(imageStrategy.isMatch(null)).toBe(false);
    });
  });

  describe('isReady', () => {
    it('should return true if target is ready', () => {
      expect(imageStrategy.isReady(maskElement)).toBe(true);
    });

    it('should return false if target is not found', () => {
      expect(imageStrategy.isReady(emptyMaskElement)).toBe(false);
    });

    it('should return false if target is not ready', () => {
      expect(imageStrategy.isReady(maskElementWithUnreadyTarget)).toBe(false);
    });

    it('should return false if it receives null', () => {
      expect(imageStrategy.isReady(null)).toBe(false);
    });
  });

  describe('load', () => {
    it('should resolve when target is loaded and return target', async () => {
      const result = await imageStrategy.load(maskElement);
      expect(result).toBe(imageElement);
    });

    it('should resolve if target is null and return null', async () => {
      const result = await imageStrategy.load(null);
      expect(result).toBe(null);
    });
  });

  describe('getRatio', () => {
    it('should return the correct target aspect ratio', () => {
      expect(imageStrategy.getRatio(maskElement)).toBe(30 / 20);
    });

    it('should return undefined if target is not ready', () => {
      expect(imageStrategy.getRatio(maskElementWithUnreadyTarget))
        .toBeUndefined();
    });

    it('should return undefined if it receives null', () => {
      expect(imageStrategy.getRatio(null)).toBeUndefined();
    });
  });
});
