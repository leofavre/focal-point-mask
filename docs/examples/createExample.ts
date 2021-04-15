import type FocalPointMask from '../../src/component/FocalPointMask';

const isEven = (num: number): boolean => (Math.round(num / 2) === num / 2);

interface CreateExampleConfig {
  name: string;
  focalPoints: string[];
  imgSrc: string;
}

interface CreateExample {
  (config: CreateExampleConfig): HTMLDivElement;
}

const createExample: CreateExample = ({ name, focalPoints, imgSrc }) => {
  let count = 0;

  const example = document.createElement('div') as HTMLDivElement;
  example.classList.add('example');
  example.classList.add(`example-${name}`);

  const mask = document.createElement('focal-point-mask') as FocalPointMask;
  mask.addEventListener('animationiteration', () => {
    count += 1;
    mask.focalPoint = focalPoints[isEven(count) ? 0 : 1];
  });
  mask.focalPoint = focalPoints[0];

  const img = document.createElement('img') as HTMLImageElement;
  img.addEventListener('load', () => {
    img.classList.add('loaded');
    mask.classList.add('loaded');
  });
  img.src = imgSrc;

  example.appendChild(mask);
  mask.appendChild(img);

  return example;
};

export default createExample;
