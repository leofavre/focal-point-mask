import type FocalPointMask from '../src/component/FocalPointMask';

interface CreateExampleConfig {
  name: string;
  focalPoints: string[];
  imgSrc: string;
  duration: number;
}

interface CreateExample {
  (config: CreateExampleConfig): HTMLDivElement;
}

const createExample: CreateExample = ({
  name,
  focalPoints,
  imgSrc,
  duration = 4300
}) => {
  let count = -1;
  const HALF_ANIMATION_TIME = duration / 2;

  const example = document.createElement('div') as HTMLDivElement;
  example.classList.add('example');
  example.classList.add(`example-${name}`);

  const fp = document.createElement('div') as HTMLDivElement;
  fp.classList.add('fp');

  const mask = document.createElement('focal-point-mask') as FocalPointMask;

  const changeFocalPoint = (options: string[], turn: number): void => {
    const len = options.length;
    mask.focalPoint = options[Math.round((turn / len % 1) * len)];
    fp.style.top = mask.focalPoint.split(' ')[0];
    fp.style.left = mask.focalPoint.split(' ')[1];
  };

  const handleAnimation = () => {
    count += 1;
    changeFocalPoint(focalPoints, count);

    setTimeout(() => {
      count += 1;
      changeFocalPoint(focalPoints, count);
    }, HALF_ANIMATION_TIME);
  };

  mask.style.animationDuration = `${duration}ms`;
  mask.addEventListener('animationstart', handleAnimation);
  mask.addEventListener('animationiteration', handleAnimation);
  mask.focalPoint = focalPoints[0];

  const img = document.createElement('img') as HTMLImageElement;
  img.addEventListener('load', () => {
    img.classList.add('loaded');
    mask.classList.add('loaded');
  });
  img.src = imgSrc;

  example.appendChild(mask);
  mask.appendChild(img);
  mask.appendChild(fp);

  return example;
};

export default createExample;
