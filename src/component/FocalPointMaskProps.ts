interface FocalPointMaskProps {
  focalPoint?: string;
  minWidth?: number;
  minHeight?: number;
  aspectRatio?: string;
  onMaskResize?(event: CustomEvent<ResizeObserverEntry[]>): void
}

export default FocalPointMaskProps;
