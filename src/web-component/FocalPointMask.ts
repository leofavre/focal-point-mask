import Template from './Template';
import getMediaRatio from '../helpers/getMediaRatio';
import onMediaLoaded from '../helpers/onMediaLoaded';
import type { MediaElement } from '../types/MediaElement';
import type { FocalPoint } from '../types/FocalPoint';

type ObservedAttribute = 'focalpoint';

class FocalPointMask extends HTMLElement {
  public media: MediaElement | null;
  private _mutationObserver: MutationObserver;
  private _resizeObserver: ResizeObserver;

  constructor () {
    super();
    this.attachShadow({ mode: 'open' });
    const content = Template.content.cloneNode(true);
    this.shadowRoot?.appendChild(content);
  }

  connectedCallback (): void {
    this.detectMedia();

    const options = { childList: true, subtree: true };
    this._mutationObserver = new MutationObserver(() => this.detectMedia());
    this._mutationObserver.observe(this, options);

    this._resizeObserver = new ResizeObserver(() => this.handleResize());
    this._resizeObserver.observe(this);
  }

  disconnectedCallback (): void {
    this._mutationObserver && this._mutationObserver.disconnect();
    this._resizeObserver && this._resizeObserver.disconnect();
  }

  static get observedAttributes (): ObservedAttribute[] {
    return ['focalpoint'];
  }

  attributeChangedCallback (): void {
    this.handleResize();
  }

  get maskRatio (): number {
    return this.offsetWidth / this.offsetHeight;
  }

  get mediaRatio (): number | undefined {
    return getMediaRatio(this.media);
  }

  get focalPoint (): FocalPoint {
    const initialValue = '50,50';
    return JSON.parse(`[${this.getAttribute('focalpoint') || initialValue}]`);
  }

  set focalPoint ([top, left]: FocalPoint) {
    this.setAttribute('focalpoint', `${top},${left}`);
  }

  detectMedia (): void {
    this.media = this.querySelector('img, video');
    this.handleResize();

    if (this.media != null && this.mediaRatio == null) {
      onMediaLoaded(this.media, () => this.detectMedia());
    }
  }

  handleResize (): void {
    if (this.media != null && this.mediaRatio != null) {
      const [top, left] = this.focalPoint;
      const clippedSides = this.maskRatio > this.mediaRatio;

      this.media.style.width = clippedSides ? '100%' : 'auto';
      this.media.style.height = clippedSides ? 'auto' : '100%';
      this.media.style.top = `${top}%`;
      this.media.style.left = `${left}%`;
      this.media.style.transform = `translate(-${left}%, -${top}%)`;
    }
  }
}

export default FocalPointMask;
