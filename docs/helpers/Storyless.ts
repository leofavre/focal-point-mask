import { createElement } from 'react';

interface StoryFn {
  (...props: any[]): HTMLElement;
}

const prepareForInline = (storyFn: StoryFn) => {
  const html = storyFn();

  return createElement('div', {
    ref: node => node ? node.appendChild(html) : null
  });
};

interface StorylessProps {
  children: StoryFn;
}

type StorylessReturn = ReturnType<typeof prepareForInline>;

const Storyless = ({ children }: StorylessProps): StorylessReturn =>
  prepareForInline(children);

export default Storyless;
