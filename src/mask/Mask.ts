import type { MediaElement } from '../types/MediaElement';
import getMediaRatio from '../helpers/getMediaRatio';
import onMediaLoaded from '../helpers/onMediaLoaded';

type FocalPoint = {
  left: number;
  top: number;
}

class Mask {
  public mask: HTMLElement;
  public media: MediaElement | null;
  private _focalPoint: FocalPoint;

  constructor (maskElement: HTMLElement) {
    this.mask = maskElement;
    this.initMask();

    const mutationObserver = new MutationObserver(() => this.initMask());
    mutationObserver.observe(this.mask, { childList: true, subtree: true });

    const resizeObserver = new ResizeObserver(() => this.handleResize());
    resizeObserver.observe(this.mask);
  }

  get maskRatio (): number {
    return this.mask.offsetWidth / this.mask.offsetHeight;
  }

  get mediaRatio (): number | undefined {
    return getMediaRatio(this.media);
  }

  get focalPoint (): FocalPoint {
    const { left = 50, top = 50 } = this._focalPoint || {};
    return { left, top };
  }

  set focalPoint ({ left, top }: FocalPoint) {
    this._focalPoint = { left, top };

    if (this.media != null) {
      this.media.style.left = `${left}%`;
      this.media.style.top = `${top}%`;
      this.media.style.transform = `translate(-${left}%, -${top}%)`;
    }
  }

  initMask (): void {
    this.mask.classList.add('mask');
    this.media = this.mask.querySelector('img, video');

    if (this.media != null) {
      this.media.classList.add('media');

      if (this.mediaRatio != null) {
        this.handleResize();
      } else {
        onMediaLoaded(this.media, () => this.initMask());
      }
    }
  }

  handleResize (): void {
    if (this.media != null && this.mediaRatio != null) {
      const replacements = this.maskRatio > this.mediaRatio
        ? ['full-height', 'full-width']
        : ['full-width', 'full-height'];

      this.media.classList.remove(replacements[0]);
      this.media.classList.add(replacements[1]);

      const nextFocalPoint = this.focalPoint;
      this.focalPoint = nextFocalPoint;
    }
  }
}

export default Mask;
