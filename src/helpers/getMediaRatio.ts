import type { MediaElement } from '../types/MediaElement';

interface GetMediaRatio {
  (mediaElement: MediaElement | null): number | undefined;
}

const getMediaRatio: GetMediaRatio = mediaElement => {
  if (mediaElement == null) {
    return undefined;
  }

  const { nodeName } = mediaElement;
  let ratio;

  if (nodeName === 'IMG') {
    const { naturalWidth, naturalHeight } = mediaElement as HTMLImageElement;
    ratio = naturalWidth / naturalHeight;
  }

  if (nodeName === 'VIDEO') {
    const { videoWidth, videoHeight } = mediaElement as HTMLVideoElement;
    ratio = videoWidth / videoHeight;
  }

  return (ratio !== Infinity && ratio !== -Infinity)
    ? ratio || undefined
    : undefined;
};

export default getMediaRatio;
