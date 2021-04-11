import getMediaRatio from './getMediaRatio';

describe('getMediaRatio', () => {
  it('should use naturalWidth and naturalHeight if media is an image', () => {
    const mediaElement = {
      nodeName: 'IMG',
      naturalWidth: 150,
      naturalHeight: 200
    } as unknown as HTMLImageElement;

    expect(getMediaRatio(mediaElement)).toBe(150 / 200);
  });

  it('should return undefined if the element is null', () => {
    expect(getMediaRatio(null)).toBeUndefined();
  });

  it('should use videoWidth and videoHeight if media is a video', () => {
    const mediaElement = {
      nodeName: 'VIDEO',
      videoWidth: 150,
      videoHeight: 200
    } as unknown as HTMLVideoElement;

    expect(getMediaRatio(mediaElement)).toBe(150 / 200);
  });

  it('should return undefined if the element is not a media element', () => {
    const mediaElement = {
      naturalWidth: 150,
      naturalHeight: 200
    } as unknown as HTMLImageElement;

    expect(getMediaRatio(mediaElement)).toBeUndefined();
  });

  it('should return undefined if ratio is Infinity', () => {
    const mediaElement = {
      nodeName: 'IMG',
      naturalWidth: 150,
      naturalHeight: 0
    } as unknown as HTMLImageElement;

    expect(getMediaRatio(mediaElement)).toBeUndefined();
  });

  it('should return undefined if ratio is -Infinity', () => {
    const mediaElement = {
      nodeName: 'IMG',
      naturalWidth: 150,
      naturalHeight: -0
    } as unknown as HTMLImageElement;

    expect(getMediaRatio(mediaElement)).toBeUndefined();
  });

  it('should return undefined if ratio is NaN', () => {
    const mediaElement = {
      nodeName: 'IMG',
      naturalWidth: 0,
      naturalHeight: 0
    } as unknown as HTMLImageElement;

    expect(getMediaRatio(mediaElement)).toBeUndefined();
  });
});
