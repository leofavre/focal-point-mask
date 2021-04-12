import React, { useState, useRef, useLayoutEffect, PropsWithChildren, HTMLAttributes } from 'react';
import useResizeObserver from '@react-hook/resize-observer';
import Wrapper from './Wrapper';
import getMediaRatio from '../helpers/getMediaRatio';
import type { FocalPoint } from '../types/FocalPoint';

type MaybeNumber = number | undefined;

interface FocalPointMaskProps extends HTMLAttributes<HTMLDivElement> {
  focalPoint?: FocalPoint;
  preloadRatio?: MaybeNumber;
}

const FocalPointMask = (props: PropsWithChildren<FocalPointMaskProps>) => {
  const {
    focalPoint = [50, 50],
    preloadRatio,
    children,
    ...restProps
  } = props;

  const maskElement = useRef<HTMLDivElement>(null);

  const [maskRatio, setMaskRatio] = useState<number>();
  const [mediaRatio, setMediaRatio] = useState<MaybeNumber>(preloadRatio);
  const [clipSides, setClipSides] = useState<boolean>();

  const handleLoad = ({ target }) => {
    setMediaRatio(getMediaRatio(target));
  };

  const handleLoadedMetadata = ({ target }) => {
    setMediaRatio(getMediaRatio(target));
  };

  useResizeObserver(maskElement, () => {
    const { offsetWidth, offsetHeight } = maskElement.current ?? {};
    if (offsetWidth != null && offsetHeight != null) {
      setMaskRatio(offsetWidth / offsetHeight);
    }
  });

  useLayoutEffect(() => {
    if (maskRatio != null && mediaRatio != null) {
      setClipSides(maskRatio > mediaRatio);
    }
  }, [maskRatio, mediaRatio]);

  return (
    <Wrapper
      ref={maskElement}
      onLoad={handleLoad}
      onLoadedMetadata={handleLoadedMetadata}
      focalPoint={focalPoint}
      clipSides={Boolean(clipSides)}
      {...restProps}
    >
      {children}
    </Wrapper>
  );
};

export default FocalPointMask;
