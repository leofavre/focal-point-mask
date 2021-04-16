import createExample from '../helpers/createExample';

const ExampleTwo = (): HTMLDivElement => createExample({
  name: 'two',
  focalPoints: ['26% 39%', '26% 39%', '26% 100%', '26% 100%'],
  imgSrc: 'https://picsum.photos/id/22/3840/2160'
});

export default ExampleTwo;
