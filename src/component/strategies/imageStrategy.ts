import type { Strategy } from '.';

const imageStrategy: Strategy = {
  getTarget (node) {
    return node?.querySelector('*') ?? null;
  },
  isMatch (node) {
    return Boolean(node?.querySelector('*')?.nodeName === 'IMG');
  },
  isReady (node) {
    const target = this.getTarget(node) as HTMLImageElement | null;
    return Boolean(target?.complete && target?.naturalWidth !== 0);
  },
  load (node) {
    const target = this.getTarget(node);
    return new Promise(resolve => {
      target != null
        ? target.addEventListener('load', () => resolve(target))
        : resolve(target);
    });
  },
  hasNaturalAspectRatio: true,
  getRatio (node) {
    const target = this.getTarget(node) as HTMLImageElement | null;
    return target != null
      ? target.naturalWidth / target.naturalHeight
      : undefined;
  }
};

export default imageStrategy;
