import createExample from '../helpers/createExample';

const ExampleLake = (): HTMLDivElement => createExample({
  name: 'one',
  focalPoints: ['50% 15%', '50% 15%', '50% 85%', '50% 85%'],
  imgSrc: 'https://picsum.photos/id/1011/3840/2160'
});

export default ExampleLake;
