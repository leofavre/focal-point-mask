export type MediaElement = HTMLImageElement | HTMLVideoElement;

interface GetMediaRatio {
  (mediaElement: MediaElement): number | undefined;
}

const getMediaRatio: GetMediaRatio = mediaElement => {
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
