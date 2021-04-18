import videoStrategy from './videoStrategy';

const videoElement = {
  nodeName: 'VIDEO',
  readyState: 4,
  videoWidth: 30,
  videoHeight: 20,
  addEventListener: (attr: string, callback: () => void): void => callback()
} as unknown as HTMLVideoElement;

const maskElement = {
  querySelector: () => videoElement
} as unknown as HTMLElement;

const maskElementWithUnexpectedChild = {
  querySelector: () => ({ ...videoElement, nodeName: 'DIV' })
} as unknown as HTMLElement;

const maskElementWithUnreadyTarget = {
  querySelector: () => ({
    ...videoElement,
    readyState: 0,
    videoWidth: 0,
    videoHeight: 0
  })
} as unknown as HTMLElement;

const emptyMaskElement = {
  querySelector: () => null
} as unknown as HTMLElement;

describe('videoStrategy', () => {
  describe('getTarget', () => {
    it('should return the correct target', () => {
      expect(videoStrategy.getTarget(maskElement)).toBe(videoElement);
    });

    it('should return null if target is not found', () => {
      expect(videoStrategy.getTarget(emptyMaskElement)).toBeNull();
    });

    it('should return false if it receives null', () => {
      expect(videoStrategy.getTarget(null)).toBeNull();
    });
  });

  describe('isMatch', () => {
    it('should return true if target is the expected type', () => {
      expect(videoStrategy.isMatch(maskElement)).toBe(true);
    });

    it('should return false if target is not found', () => {
      expect(videoStrategy.isMatch(emptyMaskElement)).toBe(false);
    });

    it('should return false if target is not the expected type', () => {
      expect(videoStrategy.isMatch(maskElementWithUnexpectedChild)).toBe(false);
    });

    it('should return false if it receives null', () => {
      expect(videoStrategy.isMatch(null)).toBe(false);
    });
  });

  describe('isReady', () => {
    it('should return true if target is ready', () => {
      expect(videoStrategy.isReady(maskElement)).toBe(true);
    });

    it('should return false if target is not found', () => {
      expect(videoStrategy.isReady(emptyMaskElement)).toBe(false);
    });

    it('should return false if target is not ready', () => {
      expect(videoStrategy.isReady(maskElementWithUnreadyTarget)).toBe(false);
    });

    it('should return false if it receives null', () => {
      expect(videoStrategy.isReady(null)).toBe(false);
    });
  });

  describe('getRatio', () => {
    it('should return the correct target aspect ratio', () => {
      expect(videoStrategy.getRatio(maskElement)).toBe(30 / 20);
    });

    it('should return undefined if target is not ready', () => {
      expect(videoStrategy.getRatio(maskElementWithUnreadyTarget))
        .toBeUndefined();
    });

    it('should return undefined if it receives null', () => {
      expect(videoStrategy.getRatio(null)).toBeUndefined();
    });
  });

  describe('load', () => {
    it('should resolve when target is loaded and return target', async () => {
      const result = await videoStrategy.load(maskElement);
      expect(result).toBe(videoElement);
    });

    it('should resolve if target is null and return null', async () => {
      const result = await videoStrategy.load(null);
      expect(result).toBe(null);
    });
  });
});
