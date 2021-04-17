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
  }
};

export default defaultStrategy;
