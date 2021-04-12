import styled from 'styled-components';
import type { FocalPoint } from '../types/FocalPoint';

const Wrapper = styled.div<{ focalPoint: FocalPoint; clipSides: boolean; }>`
  position: relative;
  display: block;
  overflow: hidden;
  width: 100%;
  height: 100%;

  img, video {
    position: absolute;
    display: block;
    width: ${({ clipSides }) => clipSides ? '100%' : 'auto'};
    height: ${({ clipSides }) => clipSides ? 'auto' : '100%'};
    top: ${({ focalPoint }) => `${focalPoint[0]}%`};
    left: ${({ focalPoint }) => `${focalPoint[1]}%`};
    transform: ${({ focalPoint }) =>
      `translate(-${focalPoint[1]}%, -${focalPoint[0]}%)`};
  }
`;

export default Wrapper;
