import styled from 'styled-components';
import type { FocalPoint } from '../types/FocalPoint';

const Wrapper = styled.div<{ focalPoint: FocalPoint; }>`
  position: relative;
  display: block;
  overflow: hidden;

  img, video {
    position: absolute;
    display: block;
    top: ${({ focalPoint }) => `${focalPoint[0]}%`};
    left: ${({ focalPoint }) => `${focalPoint[1]}%`};
    transform: ${({ focalPoint }) =>
      `translate(-${focalPoint[1]}%, -${focalPoint[0]}%)`};
  }
`;

export default Wrapper;
