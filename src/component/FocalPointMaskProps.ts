interface FocalPointMaskProps {
  focalPoint?: string;
  minWidth?: number;
  minHeight?: number;
  onMaskResize?(event: CustomEvent<ResizeObserverEntry[]>): void
}

export default FocalPointMaskProps;
