import type { Strategy } from '.';

const defaultStrategy: Strategy = {
  name: 'default',
  getTarget (node) {
    return node?.querySelector('*') ?? null;
  },
  isMatch () {
    return true;
  },
  isReady () {
    return true;
  },
  getRatio (node) {
    const target = this.getTarget(node) as HTMLElement | null;

    const ratio = target != null
      ? target.clientWidth / target.clientHeight || undefined
      : undefined;

    return ratio !== Infinity ? ratio : undefined;
  }
};

export default defaultStrategy;
