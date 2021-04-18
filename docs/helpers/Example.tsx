import React, { FC, useState, useEffect, useRef } from 'react';
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
  resizeTo?: number;
}

const Example: FC<ExampleProps> = ({
  showProp,
  focalPoints,
  minWidth,
  minHeight,
  imgSrc,
  duration = 4300,
  isSmall,
  resizeTo
}: ExampleProps) => {
  const [count, setCount] = useState<number>(0);
  const [isLoaded, setImgSrcLoaded] = useState<boolean>(false);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [focalPoint, setFocalPoint] = useState<string>(focalPoints[0]);
  const exampleRef = useRef<HTMLElement>();

  const handleLoad = () => setImgSrcLoaded(true);
  const handleAnimation = () => setCount(count + 1);

  useEffect(() => {
    const len = focalPoints.length;
    const currentIndex = Math.round((count / len % 1) * len);
    setFocalPoint(focalPoints[currentIndex]);
  }, [focalPoints, count]);

  useEffect(() => {
    if (exampleRef.current && resizeTo != null) {
      exampleRef.current.style.setProperty('--resize', `${resizeTo}px`);
    }
  }, [resizeTo]);

  const ChildProps = {
    isLoaded,
    focalPoint,
    minWidth,
    minHeight,
    duration,
    imgSrc,
    onLoad: handleLoad
  };

  return (
    <figure
      ref={exampleRef}
      className={`example example-${showProp} ${isSmall ? 'small' : ''}`}
    >
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
