import React, { FC, useRef, useState, useEffect } from 'react';
import type FocalPointMask from '../../src/class';

interface OverlayStyle {
  top: number;
  left: number;
  width: number;
  height: number;
}

const initialOverlayStyle: OverlayStyle = {
  top: 0,
  left: 0,
  width: 0,
  height: 0
};

interface ExampleProps {
  name: string;
  focalPoints: string[];
  imgSrc: string;
  duration?: number;
  showOverlay?: boolean;
}

const Example: FC<ExampleProps> = ({
  name,
  focalPoints,
  imgSrc,
  duration = 4300,
  showOverlay
}: ExampleProps) => {
  const [count, setCount] = useState<number>(0);
  const [imgSrcLoaded, setImgSrcLoaded] = useState<boolean>(false);
  const [focalPoint, setFocalPoint] = useState<string>(focalPoints[0]);
  const [overlayStyle, setOverlayStyle] =
    useState<OverlayStyle>(initialOverlayStyle);
  const maskElementRef = useRef();

  console.log(focalPoint);

  const handleLoad = () => setImgSrcLoaded(true);

  const handleAnimation = () => {
    setCount(count + 1);
  };

  const handleMaskResize = () => {
    const maskElement: FocalPointMask | undefined = maskElementRef.current;

    if (maskElement != null && showOverlay) {
      const targetElement = maskElement.children[0];
      const targetPos = targetElement.getBoundingClientRect();

      const nextOverlayStyle = {
        top: targetPos.top,
        left: targetPos.left,
        width: targetPos.width,
        height: targetPos.height
      };

      setOverlayStyle(nextOverlayStyle);
    }
  };

  useEffect(() => {
    const maskElement: FocalPointMask | undefined = maskElementRef.current;

    if (maskElement != null && maskElement.onMaskResize == null) {
      maskElement.onMaskResize = handleMaskResize;
    }
  }, []);

  useEffect(() => {
    const len = focalPoints.length;
    const currentIndex = Math.round((count / len % 1) * len);
    setFocalPoint(focalPoints[currentIndex]);
  }, [focalPoints, count]);

  return (
    <div className={`example example-${name}`}>
      <focal-point-mask
        ref={maskElementRef}
        focalPoint={focalPoint}
        onAnimationStart={handleAnimation}
        onAnimationIteration={handleAnimation}
        style={{ animationDuration: `${duration}ms` }}
      >
        <img
          className={imgSrcLoaded ? 'loaded' : ''}
          src={imgSrc}
          onLoad={handleLoad}
        />
      </focal-point-mask>
      <div
        className={`overlay ${showOverlay ? 'visible' : ''}`}
        style={overlayStyle}
      >
        <span
          className="focal-point"
          style={{
            top: focalPoint.split(' ')[0],
            left: focalPoint.split(' ')[1]
          }}
        />
      </div>
    </div>
  );
};

export default Example;
