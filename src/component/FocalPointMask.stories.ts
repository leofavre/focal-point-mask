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
        '(*top*, *bottom*, *left*, *right* and *center*) or percentage ' +
        'values representing the distance from the top left corner ' +
        'to the focal point.\n\n' +
        'If a single keyword or percentage value is passed, the second ' +
        'value will be set to *center*.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'center' }
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

// Image

const withImage = baseElement.cloneNode() as FocalPointMask;
const IMG_SRC = 'https://picsum.photos/id/1012/3840/2160';

export const Image = (props: Props): FocalPointMask => {
  Object.entries(props).forEach(([key, value]) => {
    withImage.setAttribute(key, value);
  });

  if (withImage.childElementCount === 0) {
    withImage.innerHTML = `
      <img src="${IMG_SRC}">
    `;
  }

  return withImage;
};

Image.args = {
  focalPoint: '35% 75%',
  mediaRatio: '16/9'
};

Image.parameters = {
  docs: {
    source: {
      code: '' +
        `<focal-point-mask focalPoint="${Image.args.focalPoint}" mediaRatio="${Image.args.mediaRatio}">\n` +
        `  <img src="${IMG_SRC}">\n` +
        '</focal-point-mask>'
    }
  }
};

// Video

const withVideo = baseElement.cloneNode() as FocalPointMask;
const VIDEO_SRC = 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_1280_10MG.mp4';

export const Video = (props: Props): FocalPointMask => {
  Object.entries(props).forEach(([key, value]) => {
    withVideo.setAttribute(key, value);
  });
  if (withVideo.childElementCount === 0) {
    withVideo.innerHTML = `
      <video autoplay muted loop>
        <source src="${VIDEO_SRC}">
      </video>
    `;
  }

  (withVideo.children[0] as HTMLVideoElement).play();

  return withVideo;
};

Video.args = {
  focalPoint: 'center',
  mediaRatio: '16/9'
};

Video.parameters = {
  docs: {
    source: {
      code: '' +
        `<focal-point-mask focalPoint="${Video.args.focalPoint}" mediaRatio="${Video.args.mediaRatio}">\n` +
        '  <video autoplay muted loop>\n' +
        `    <source src="${VIDEO_SRC}">\n` +
        '  </video>\n' +
        '</focal-point-mask>'
    }
  }
};
