import ResizeObserverPolyfill from 'resize-observer-polyfill';
import Template from './Template';
import getMediaRatio from '../helpers/getMediaRatio';
import onMediaLoaded from '../helpers/onMediaLoaded';
import type { MediaElement } from '../types/MediaElement';
import type { FocalPoint } from '../types/FocalPoint';

type ObservedAttribute = 'focalpoint';

const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;

class FocalPointMask extends HTMLElement {
  public preloadRatio?: number;
  private media: MediaElement | null;
  private mutationObserver: MutationObserver;
  private resizeObserver: ResizeObserver;

  constructor () {
    super();
    this.attachShadow({ mode: 'open' });
    const content = Template.content.cloneNode(true);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.shadowRoot!.appendChild(content);
  }

  connectedCallback (): void {
    this.detectMedia();

    const options = { childList: true, subtree: true };
    this.mutationObserver = new MutationObserver(() => this.detectMedia());
    this.mutationObserver.observe(this, options);

    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(this);
  }

  disconnectedCallback (): void {
    this.mutationObserver && this.mutationObserver.disconnect();
    this.resizeObserver && this.resizeObserver.disconnect();
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
    const maybeRatio = this.getAttribute('preloadratio') || this.preloadRatio;
    return getMediaRatio(this.media) || Number(maybeRatio) || undefined;
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
      const clipSides = this.maskRatio > this.mediaRatio;
      const [top, left] = this.focalPoint;

      this.media.style.position = 'absolute';
      this.media.style.display = 'block';
      this.media.style.width = clipSides ? '100%' : 'auto';
      this.media.style.height = clipSides ? 'auto' : '100%';
      this.media.style.top = `${top}%`;
      this.media.style.left = `${left}%`;
      this.media.style.transform = `translate(-${left}%, -${top}%)`;
    }
  }
}

export default FocalPointMask;
