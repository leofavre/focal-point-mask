import ResizeObserverPolyfill from 'resize-observer-polyfill';
import Template from './Template';
import getAttr from '../helpers/getAttr';
import setAttr from '../helpers/setAttr';
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

type Attr = 'focalpoint' | 'aspectratio' | 'minwidth' | 'minheight';

const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;

class FocalPointMask extends HTMLElement {
  public onResize?: (evt: CustomEvent<ResizeObserverEntry[]>) => void;
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

  protected connectedCallback (): void {
    this.detectMedia();

    this.upgradeProperty('focalpoint');
    this.upgradeProperty('aspectratio');
    this.upgradeProperty('minheight');
    this.upgradeProperty('minwidth');

    const options = { childList: true, subtree: true };

    this.mutationObserver = new MutationObserver(() => {
      this.detectMedia();
    });

    this.mutationObserver.observe(this, options);

    this.resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        this.handleChange();
        this.handleResize(entries);
      }
    );

    this.resizeObserver.observe(this);
  }

  protected disconnectedCallback (): void {
    this.mutationObserver && this.mutationObserver.disconnect();
    this.resizeObserver && this.resizeObserver.disconnect();
  }

  private upgradeProperty (propName: Attr) {
    if (Object.prototype.hasOwnProperty.call(this, propName)) {
      const value = this[propName];
      delete this[propName];
      this[propName] = value;
    }
  }

  protected static get observedAttributes (): Attr[] {
    return ['focalpoint', 'aspectratio', 'minwidth', 'minheight'];
  }

  protected attributeChangedCallback (): void {
    this.handleChange();
  }

  private get maskRatio (): number {
    return this.offsetWidth / this.offsetHeight;
  }

  get focalPoint (): string | undefined {
    return getAttr<Attr>(this, 'focalpoint');
  }

  set focalPoint (value: string | undefined) {
    setAttr<Attr>(this, 'focalpoint', value);
  }

  private get parsedFocalPoint (): number[] | undefined {
    return parsePosition(this.focalPoint);
  }

  get aspectRatio (): string | undefined {
    return getAttr<Attr>(this, 'aspectratio');
  }

  set aspectRatio (value: string | undefined) {
    setAttr<Attr>(this, 'aspectratio', value);
  }

  private get parsedAspectRatio (): number | undefined {
    return parseAspectRatio(this.aspectRatio) ||
      getMediaRatio(this.media) ||
      undefined;
  }

  get minWidth (): number | undefined {
    const attr = getAttr<Attr>(this, 'minwidth');
    return attr != null ? Number(attr) : attr;
  }

  set minWidth (value: number | undefined) {
    setAttr<Attr>(this, 'minwidth', value);
  }

  get minHeight (): number | undefined {
    const attr = getAttr<Attr>(this, 'minheight');
    return attr != null ? Number(attr) : attr;
  }

  set minHeight (value: number | undefined) {
    setAttr<Attr>(this, 'minheight', value);
  }

  private detectMedia (): void {
    this.media = this.querySelector('img, video');
    this.handleChange();

    if (this.media != null && this.parsedAspectRatio == null) {
      onMediaLoaded(this.media, () => this.detectMedia());
    }
  }

  private handleChange (): void {
    if (this.media != null && this.parsedAspectRatio != null) {
      const cropSides = this.maskRatio < this.parsedAspectRatio;
      const [top = CENTER, left = CENTER] = this.parsedFocalPoint || [];

      const minWidth = Math.max(
        this.minWidth || 0,
        (this.minHeight || 0) * this.parsedAspectRatio
      );

      const minHeight = Math.max(
        (this.minWidth || 0) / this.parsedAspectRatio,
        this.minHeight || 0
      );

      this.media.style.position = 'absolute';
      this.media.style.display = 'block';
      this.media.style.width = cropSides ? 'auto' : '100%';
      this.media.style.minWidth = `${minWidth}px`;
      this.media.style.height = cropSides ? '100%' : 'auto';
      this.media.style.minHeight = `${minHeight}px`;
      this.media.style.top = `${top}%`;
      this.media.style.left = `${left}%`;
      this.media.style.transform = `translate(${left * -1}%, ${top * -1}%)`;

      const keepUserRatio =
        this.parsedAspectRatio !== getMediaRatio(this.media);

      this.media.style.aspectRatio = keepUserRatio
        ? `${this.parsedAspectRatio}/1`
        : '';
    }
  }

  private handleResize (detail: ResizeObserverEntry[]): void {
    const event = new CustomEvent<ResizeObserverEntry[]>('resize', {
      bubbles: true,
      detail
    });

    this.dispatchEvent(event);
    this.onResize && this.onResize(event);
  }
}

export default FocalPointMask;
