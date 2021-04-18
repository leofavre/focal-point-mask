import React, { FC, useState, useEffect } from 'react';
import type { FocalPointMaskProps, FocalPointMaskReactProps } from '../../src/class';

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace JSX {
    // eslint-disable-next-line no-unused-vars
    interface IntrinsicElements {
      'focal-point-mask': FocalPointMaskReactProps
    }
  }
}

interface ChildProps extends Omit<FocalPointMaskProps, 'onMaskResize'> {
  isVisible?: boolean;
  isLoaded?: boolean;
  duration: number;
  imgSrc: string;
  onAnimation?: () => void;
  onLoad: () => void;
}

const Child: FC<ChildProps> = ({
  isVisible,
  isLoaded,
  focalPoint,
  aspectRatio,
  minWidth,
  minHeight,
  duration,
  imgSrc,
  onAnimation,
  onLoad
}: ChildProps) => {
  const maybeOnAnimation = () => {
    onAnimation && onAnimation();
  };

  return (
    <focal-point-mask
      focalPoint={focalPoint}
      aspectRatio={aspectRatio}
      minWidth={minWidth}
      minHeight={minHeight}
      onAnimationStart={maybeOnAnimation}
      onAnimationIteration={maybeOnAnimation}
      style={{
        visibility: isVisible ? 'visible' : 'hidden',
        animationDuration: `${duration}ms`
      }}
    >
      <img
        className={`aspect-ratio-box-inside ${isLoaded ? 'loaded' : ''}`}
        src={imgSrc}
        onLoad={onLoad}
      />
    </focal-point-mask>
  );
};

interface ExampleProps extends Omit<
  FocalPointMaskProps, 'focalPoint' | 'onMaskResize'
> {
  showProp?: string;
  focalPoints: string[];
  imgSrc: string;
  duration?: number;
  isSmall?: boolean;
}

const Example: FC<ExampleProps> = ({
  showProp,
  focalPoints,
  aspectRatio,
  minWidth,
  minHeight,
  imgSrc,
  duration = 4300,
  isSmall
}: ExampleProps) => {
  const [count, setCount] = useState<number>(0);
  const [isLoaded, setImgSrcLoaded] = useState<boolean>(false);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [focalPoint, setFocalPoint] = useState<string>(focalPoints[0]);

  const handleLoad = () => setImgSrcLoaded(true);
  const handleAnimation = () => setCount(count + 1);

  useEffect(() => {
    const len = focalPoints.length;
    const currentIndex = Math.round((count / len % 1) * len);
    setFocalPoint(focalPoints[currentIndex]);
  }, [focalPoints, count]);

  const ChildProps = {
    isLoaded,
    focalPoint,
    aspectRatio,
    minWidth,
    minHeight,
    duration,
    imgSrc,
    onLoad: handleLoad
  };

  return (
    <figure className={`example example-${showProp} ${isSmall ? 'small' : ''}`}>
      <Child
        isVisible
        onAnimation={handleAnimation}
        {...ChildProps}
      />
      <Child
        isVisible={isRevealed}
        {...ChildProps}
      />
      <figcaption>
        {showProp === 'focalPoint' && (
          <span className="caption-item">
            focalPoint:
            <span>{'"'}{focalPoint}{'"'}</span>
          </span>
        )}
        {showProp === 'minWidth' && (
          <span className="caption-item">
            minWidth:
            <span>{minWidth}</span>
          </span>
        )}
        {showProp === 'minHeight' && (
          <span className="caption-item">
            minHeight:
            <span>{minHeight}</span>
          </span>
        )}
        {showProp === 'aspectRatio' && (
          <span className="caption-item">
            aspectRatio:
            <span>{'"'}{aspectRatio}{'"'}</span>
          </span>
        )}
        <label className="caption-item">
          <input
            type="checkbox"
            defaultChecked={isRevealed}
            onChange={() => setIsRevealed(!isRevealed)}
          />
          unmask
        </label>
      </figcaption>
    </figure>
  );
};

export default Example;
