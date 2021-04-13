import FocalPointMask from './FocalPointMask';

if (!window.customElements.get('focal-point-mask')) {
  window.customElements.define('focal-point-mask', FocalPointMask);
}

export default {
  title: 'Focal Point Mask',
  argTypes: {
    focalPoint: {
      name: 'focalPoint',
      description: '' +
        '**The coordinate of the area that should be preserved when ' +
        'the media is cropped.**\n\n' +
        'Similarly to **background-position** in CSS, it expects ' +
        'a pair of position keywords ' +
        '(*top*, *bottom*, *left*, *right* and *center*) or percentages ' +
        'representing the distance from the top left corner ' +
        'to the focal point.\n\n' +
        'If a single keyword or percentage is passed, the second ' +
        'value will be set to *center*.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'center center' }
      },
      control: {
        type: 'text'
      }
    },
    mediaRatio: {
      name: 'mediaRatio',
      description: '' +
        '**A string representing the division of the media width ' +
        'by its height.**\n\n' +
        'Although the ratio is automatically calculated after the ' +
        'media is fully loaded, setting **mediaRatio** can prevent it ' +
        'from resizing during the process.\n\n' +
        'The property is mandatory for iframe embeds in general, ' +
        'like Youtube or Vimeo videos, which ratios cannot be calculated.',
      table: {
        type: { summary: 'string' }
      },
      control: {
        type: 'text'
      }
    }
  }
};

interface Props {
  focalPoint?: string;
  mediaRatio?: string;
}

const baseElement = document.createElement('focal-point-mask');

const withDefault = baseElement.cloneNode() as FocalPointMask;

export const Default = (props: Props): FocalPointMask => {
  Object.entries(props).forEach(([key, value]) => {
    withDefault.setAttribute(key, value);
  });

  if (withDefault.childElementCount === 0) {
    withDefault.innerHTML = `
      <img src="https://picsum.photos/id/1012/3840/2160">
    `;
  }

  return withDefault;
};

Default.args = {
  focalPoint: '35% 75%',
  mediaRatio: '16/9'
};

Default.parameters = {
  docs: {
    source: {
      code: '' +
        '<focal-point-mask focalPoint="25% 75%" mediaRatio="16/9">\n' +
        '  <img src="https://picsum.photos/id/1012/3840/2160">\n' +
        '</focal-point-mask>'
    }
  }
};
