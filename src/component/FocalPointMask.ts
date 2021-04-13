import ResizeObserverPolyfill from 'resize-observer-polyfill';
import Template from './Template';
import getMediaRatio from '../helpers/getMediaRatio';
import onMediaLoaded from '../helpers/onMediaLoaded';
import parseAspectRatio from '../helpers/parseAspectRatio';
import parsePosition, { CENTER } from '../helpers/parsePosition';
import type { MediaElement } from '../types/MediaElement';

declare global {
  interface CSSStyleDeclaration {
    aspectRatio: string;
  }
}

const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;

class FocalPointMask extends HTMLElement {
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

  static get observedAttributes (): string[] {
    return ['focalpoint', 'mediaratio', 'mediaminwidth', 'mediaminheight'];
  }

  attributeChangedCallback (): void {
    this.handleResize();
  }

  get maskRatio (): number {
    return this.offsetWidth / this.offsetHeight;
  }

  get focalPoint (): string | undefined {
    return this.getAttribute('focalpoint') || undefined;
  }

  set focalPoint (value: string | undefined) {
    if (value != null) {
      this.setAttribute('focalpoint', value);
    } else {
      this.removeAttribute('focalpoint');
    }
  }

  get parsedFocalPoint (): number[] | undefined {
    return parsePosition(this.focalPoint);
  }

  get mediaRatio (): string | undefined {
    return this.getAttribute('mediaratio') || undefined;
  }

  set mediaRatio (value: string | undefined) {
    if (value != null) {
      this.setAttribute('mediaratio', value);
    } else {
      this.removeAttribute('mediaratio');
    }
  }

  get parsedMediaRatio (): number | undefined {
    return parseAspectRatio(this.mediaRatio) ||
      getMediaRatio(this.media) ||
      undefined;
  }

  get mediaMinWidth (): number | undefined {
    return Number(this.getAttribute('mediaminwidth')) || undefined;
  }

  set mediaMinWidth (value: number | undefined) {
    if (value != null) {
      this.setAttribute('mediaminwidth', String(value));
    } else {
      this.removeAttribute('mediaminwidth');
    }
  }

  get mediaMinHeight (): number | undefined {
    return Number(this.getAttribute('mediaminheight')) || undefined;
  }

  set mediaMinHeight (value: number | undefined) {
    if (value != null) {
      this.setAttribute('mediaminheight', String(value));
    } else {
      this.removeAttribute('mediaminheight');
    }
  }

  detectMedia (): void {
    this.media = this.querySelector('img, video');
    this.handleResize();

    if (this.media != null && this.parsedMediaRatio == null) {
      onMediaLoaded(this.media, () => this.detectMedia());
    }
  }

  handleResize (): void {
    if (this.media != null && this.parsedMediaRatio != null) {
      const clipSides = this.maskRatio < this.parsedMediaRatio;
      const keepUserRatio = this.parsedMediaRatio !== getMediaRatio(this.media);
      const [top = CENTER, left = CENTER] = this.parsedFocalPoint || [];

      const minWidth = Math.max(
        this.mediaMinWidth || 0,
        (this.mediaMinHeight || 0) * this.parsedMediaRatio
      );

      const minHeight = Math.max(
        (this.mediaMinWidth || 0) / this.parsedMediaRatio,
        this.mediaMinHeight || 0
      );

      this.media.style.position = 'absolute';
      this.media.style.display = 'block';
      this.media.style.width = clipSides ? 'auto' : '100%';
      this.media.style.minWidth = `${minWidth}px` || '';
      this.media.style.height = clipSides ? '100%' : 'auto';
      this.media.style.minHeight = `${minHeight}px` || '';
      this.media.style.top = `${top}%`;
      this.media.style.left = `${left}%`;
      this.media.style.transform = `translate(${left * -1}%, ${top * -1}%)`;

      this.media.style.aspectRatio = keepUserRatio
        ? `${this.parsedMediaRatio}/1`
        : '';
    }
  }
}

export default FocalPointMask;
