import imageStrategy from './imageStrategy';
import videoStrategy from './videoStrategy';
import pictureStrategy from './pictureStrategy';
import defaultStrategy from './defaultStrategy';

export interface Strategy {
  getTarget(node: HTMLElement | null): HTMLElement | null;
  isMatch(node: HTMLElement | null): boolean;
  isReady(node: HTMLElement | null): boolean;
  load(node: HTMLElement | null): Promise<HTMLElement | null>;
  hasNaturalAspectRatio: boolean;
  getRatio(node: HTMLElement | null): number | undefined;
}

const strategies: Strategy[] = [
  imageStrategy,
  videoStrategy,
  pictureStrategy
];

const detectStrategy = (node: HTMLElement | null): Strategy => {
  return (node != null)
    ? strategies.find(strategy => strategy.isMatch(node)) ?? defaultStrategy
    : defaultStrategy;
};

export default detectStrategy;
