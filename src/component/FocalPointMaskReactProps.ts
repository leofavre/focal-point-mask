import { DetailedHTMLProps, HTMLAttributes } from 'react';
import FocalPointMaskProps from './FocalPointMaskProps';

type FocalPointMaskReactProps = FocalPointMaskProps | DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
>

export default FocalPointMaskReactProps;
