import getMediaRatio from './getMediaRatio';
import type { MediaElement } from '../types/MediaElement';

let mediaElement: MediaElement;

describe('getMediaRatio', () => {
  it('should use naturalWidth and naturalHeight if media is an image', () => {
    mediaElement = {
      nodeName: 'IMG',
      naturalWidth: 150,
      naturalHeight: 200
    } as HTMLImageElement;

    expect(getMediaRatio(mediaElement)).toBe(150 / 200);
  });

  it('should return undefined if the element is null', () => {
    expect(getMediaRatio(null)).toBeUndefined();
  });

  it('should use videoWidth and videoHeight if media is a video', () => {
    mediaElement = {
      nodeName: 'VIDEO',
      videoWidth: 150,
      videoHeight: 200
    } as HTMLVideoElement;

    expect(getMediaRatio(mediaElement)).toBe(150 / 200);
  });

  it('should return undefined if the element is not a media element', () => {
    mediaElement = {
      naturalWidth: 150,
      naturalHeight: 200
    } as HTMLImageElement;

    expect(getMediaRatio(mediaElement)).toBeUndefined();
  });

  it('should return undefined if ratio is Infinity', () => {
    mediaElement = {
      nodeName: 'IMG',
      naturalWidth: 150,
      naturalHeight: 0
    } as HTMLImageElement;

    expect(getMediaRatio(mediaElement)).toBeUndefined();
  });

  it('should return undefined if ratio is -Infinity', () => {
    mediaElement = {
      nodeName: 'IMG',
      naturalWidth: 150,
      naturalHeight: -0
    } as HTMLImageElement;

    expect(getMediaRatio(mediaElement)).toBeUndefined();
  });

  it('should return undefined if ratio is NaN', () => {
    mediaElement = {
      nodeName: 'IMG',
      naturalWidth: 0,
      naturalHeight: 0
    } as HTMLImageElement;

    expect(getMediaRatio(mediaElement)).toBeUndefined();
  });
});
