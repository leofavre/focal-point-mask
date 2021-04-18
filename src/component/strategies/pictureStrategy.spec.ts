import pictureStrategy from './pictureStrategy';

const pictureElement = {
  nodeName: 'PICTURE'
} as unknown as HTMLPictureElement;

const imageElement = {
  nodeName: 'IMG',
  complete: true,
  naturalWidth: 30,
  naturalHeight: 20,
  addEventListener: (attr: string, callback: () => void): void => callback()
} as unknown as HTMLImageElement;

const maskElement = {
  querySelector: (selector: string) => selector === 'img'
    ? imageElement
    : pictureElement
} as unknown as HTMLElement;

const maskElementWithUnexpectedChild = {
  querySelector: (selector: string) => selector === 'img'
    ? imageElement
    : { nodeName: 'DIV' }
} as unknown as HTMLElement;

const maskElementWithUnreadyTarget = {
  querySelector: (selector: string) => selector === 'img'
    ? ({
        ...imageElement,
        complete: false,
        naturalWidth: 0,
        naturalHeight: 0
      })
    : pictureElement
} as unknown as HTMLElement;

const emptyMaskElement = {
  querySelector: () => null
} as unknown as HTMLElement;

describe('pictureStrategy', () => {
  describe('getTarget', () => {
    it('should return the correct target', () => {
      expect(pictureStrategy.getTarget(maskElement)).toBe(imageElement);
    });

    it('should return null if target is not found', () => {
      expect(pictureStrategy.getTarget(emptyMaskElement)).toBeNull();
    });

    it('should return false if it receives null', () => {
      expect(pictureStrategy.getTarget(null)).toBeNull();
    });
  });

  describe('isMatch', () => {
    it('should return true if target is the expected type', () => {
      expect(pictureStrategy.isMatch(maskElement)).toBe(true);
    });

    it('should return false if target is not found', () => {
      expect(pictureStrategy.isMatch(emptyMaskElement)).toBe(false);
    });

    it('should return false if target is not the expected type', () => {
      expect(pictureStrategy.isMatch(maskElementWithUnexpectedChild))
        .toBe(false);
    });

    it('should return false if it receives null', () => {
      expect(pictureStrategy.isMatch(null)).toBe(false);
    });
  });

  describe('isReady', () => {
    it('should return true if target is ready', () => {
      expect(pictureStrategy.isReady(maskElement)).toBe(true);
    });

    it('should return false if target is not found', () => {
      expect(pictureStrategy.isReady(emptyMaskElement)).toBe(false);
    });

    it('should return false if target is not ready', () => {
      expect(pictureStrategy.isReady(maskElementWithUnreadyTarget)).toBe(false);
    });

    it('should return false if it receives null', () => {
      expect(pictureStrategy.isReady(null)).toBe(false);
    });
  });

  describe('getRatio', () => {
    it('should return the correct target aspect ratio', () => {
      expect(pictureStrategy.getRatio(maskElement)).toBe(30 / 20);
    });

    it('should return undefined if target is not ready', () => {
      expect(pictureStrategy.getRatio(maskElementWithUnreadyTarget))
        .toBeUndefined();
    });

    it('should return undefined if it receives null', () => {
      expect(pictureStrategy.getRatio(null)).toBeUndefined();
    });
  });

  describe('load', () => {
    it('should resolve when target is loaded and return target', async () => {
      const result = await pictureStrategy.load(maskElement);
      expect(result).toBe(imageElement);
    });

    it('should resolve if target is null and return null', async () => {
      const result = await pictureStrategy.load(null);
      expect(result).toBe(null);
    });
  });
});
