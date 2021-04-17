import description from './onMaskResize.md';

const onMaskResize = {
  name: 'onMaskResize',
  description,
  table: {
    category: 'Events',
    type: { summary: '(evt: CustomEvent<ResizeObserverEntry[]>): void' }
  },
  action: 'resize'
};

export default onMaskResize;
