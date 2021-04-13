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
        'Similarly to **background-position** in CSS, it can either receive ' +
        'one or two keywords out of top, bottom, left, right ' +
        'and center or one or two percentage values starting from the ' +
        'top left corner.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '50,50' }
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
        'media is loaded, setting **mediaRatio** can prevent it ' +
        'from blinking during the process.\n\n' +
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
    withDefault.setAttribute(key.toLocaleLowerCase(), value);
  });

  if (withDefault.childElementCount === 0) {
    withDefault.innerHTML = `
      <img src="https://picsum.photos/id/1012/3973/2639">
    `;
  }

  return withDefault;
};

Default.args = {
  focalPoint: '50,50',
  mediaRatio: '3973 / 2639'
};
