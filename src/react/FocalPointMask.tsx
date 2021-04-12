import React, { PropsWithChildren, HTMLAttributes } from 'react';
import Wrapper from './Wrapper';
import type { FocalPoint } from '../types/FocalPoint';

interface FocalPointMaskProps extends HTMLAttributes<HTMLElement> {
  focalPoint?: FocalPoint;
}

const FocalPointMask = (props: PropsWithChildren<FocalPointMaskProps>) => {
  const { focalPoint = [50, 50], children, ...restProps } = props;

  return <Wrapper focalPoint={focalPoint} {...restProps}>
    {children}
  </Wrapper>;
};

export default FocalPointMask;
