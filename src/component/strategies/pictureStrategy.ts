import type { Strategy } from '.';
import imageStrategy from './imageStrategy';

const pictureStrategy: Strategy = {
  ...imageStrategy,
  getTarget (node) {
    return node?.querySelector('img') ?? null;
  },
  isMatch (node) {
    return Boolean(node?.querySelector('*')?.nodeName === 'PICTURE');
  }
};

export default pictureStrategy;
