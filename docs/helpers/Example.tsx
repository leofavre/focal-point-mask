import React, { FC, useState, useEffect } from 'react';

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
  const [count, setCount] = useState<number>(-1);
  const [imgSrcLoaded, setImgSrcLoaded] = useState<boolean>(false);
  const [focalPoint, setFocalPoint] = useState<string>(focalPoints[0]);

  const handleLoad = () => setImgSrcLoaded(true);

  const handleAnimation = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    const len = focalPoints.length;
    const currentIndex = Math.round((count / len % 1) * len);
    setFocalPoint(focalPoints[currentIndex]);
  }, [focalPoints, count]);

  return (
    <div className={`example example-${name}`}>
      <focal-point-mask
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
      <div className={`overlay ${showOverlay ? 'visible' : ''}`}>
        <span className="focal-point"/>
      </div>
    </div>
  );
};

export default Example;
