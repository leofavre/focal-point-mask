import React from 'react';
import { render } from 'react-dom';
import FocalPointMask from './web-component/FocalPointMask';
import FocalPointMaskReact from './react/FocalPointMask';

declare global {
  export namespace JSX {
    export interface IntrinsicElements {
      'focal-point-mask': {
        focalpoint?: string;
        preloadratio?: string;
        children: Element;
      }
    }
  }
}

const App = () => {
  if (!window.customElements.get('focal-point-mask')) {
    window.customElements.define('focal-point-mask', FocalPointMask);
  }

  const VIDEO_SRC = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/' +
    'h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4';

  return (
    <>
      <FocalPointMaskReact
        focalPoint={[44, 75]}
        preloadRatio={1.5}
        style={{ width: '100%', height: 500, resize: 'both' }}
      >
        <img src="https://picsum.photos/id/1012/3973/2639"/>
      </FocalPointMaskReact>

      <FocalPointMaskReact
        focalPoint={[30, 48]}
        preloadRatio={1.5}
        style={{ width: '100%', height: 500, resize: 'both' }}
      >
        <img src="https://picsum.photos/id/1011/5472/3648"/>
      </FocalPointMaskReact>

      <FocalPointMaskReact
        style={{ width: '100%', height: 500, resize: 'both' }}
      >
        <video src={VIDEO_SRC}></video>
      </FocalPointMaskReact>

      <focal-point-mask focalpoint="44,75" preloadratio="1.5">
        <img src="https://picsum.photos/id/1012/3973/2639"/>
      </focal-point-mask>

      <focal-point-mask focalpoint="30,48" preloadratio="1.5">
        <img src="https://picsum.photos/id/1011/5472/3648"/>
      </focal-point-mask>

      <focal-point-mask>
        <video src={VIDEO_SRC}></video>
      </focal-point-mask>
    </>
  );
};

render(<App />, document.getElementById('root'));
