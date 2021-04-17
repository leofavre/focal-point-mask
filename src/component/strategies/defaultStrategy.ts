import type { Strategy } from '.';

const defaultStrategy: Strategy = {
  getTarget (node) {
    return node?.querySelector('*') ?? null;
  },
  isMatch () {
    return true;
  },
  isReady () {
    return true;
  },
  load (node) {
    return Promise.resolve(this.getTarget(node));
  },
  hasNaturalAspectRatio: false,
  getRatio () {
    return undefined;
  }
};

export default defaultStrategy;
