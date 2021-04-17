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
  hasNaturalAspectRatio: false,
  getRatio () {
    return undefined;
  }
};

export default defaultStrategy;
