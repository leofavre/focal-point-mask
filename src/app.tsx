import React from 'react';
import { render } from 'react-dom';
import FocalPointMask from './web-component/FocalPointMask';

declare global {
  export namespace JSX {
    export interface IntrinsicElements {
      'focal-point-mask': {
        focalpoint?: string;
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
      <focal-point-mask focalpoint="44,75">
        <img src="https://picsum.photos/id/1012/3973/2639"/>
      </focal-point-mask>

      <focal-point-mask focalpoint="30,48">
        <img src="https://picsum.photos/id/1011/5472/3648"/>
      </focal-point-mask>

      <focal-point-mask>
        <video src={VIDEO_SRC}></video>
      </focal-point-mask>
    </>
  );
};

render(<App />, document.getElementById('root'));
