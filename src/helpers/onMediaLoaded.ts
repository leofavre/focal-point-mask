import type { MediaElement } from '../types/MediaElement';

interface OnMediaLoaded {
  (mediaElement: MediaElement, callback: (evt: Event) => void): void;
}

const onMediaLoaded: OnMediaLoaded = (mediaElement, callback) => {
  const { nodeName } = mediaElement;

  if (nodeName === 'IMG') {
    mediaElement.addEventListener('load', callback);
  }

  if (nodeName === 'VIDEO') {
    mediaElement.addEventListener('loadedmetadata', callback);
  }
};

export default onMediaLoaded;
