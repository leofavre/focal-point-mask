import type { Strategy } from '.';

const videoStrategy: Strategy = {
  name: 'video',
  getTarget (node) {
    return node?.querySelector('*') ?? null;
  },
  isMatch (node) {
    return Boolean(node?.querySelector('*')?.nodeName === 'VIDEO');
  },
  isReady (node) {
    const target = this.getTarget(node) as HTMLVideoElement | null;
    return (target?.readyState || 0) >= 1;
  },
  load (node) {
    const target = this.getTarget(node);
    return new Promise(resolve => {
      target != null
        ? target.addEventListener('loadedmetadata', () => resolve(target))
        : resolve(target);
    });
  },
  getRatio (node) {
    const target = this.getTarget(node) as HTMLVideoElement | null;
    return target != null
      ? target.videoWidth / target.videoHeight || undefined
      : undefined;
  }
};

export default videoStrategy;
