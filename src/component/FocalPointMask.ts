import ResizeObserverPolyfill from 'resize-observer-polyfill';
import Template from './Template';
import { getAttr, setAttr, parseAspectRatio, parsePosition, CENTER } from '../helpers';
import detectStrategy from './strategies';
import type { Strategy } from './strategies';

type Attr = 'focalpoint' | 'aspectratio' | 'minwidth' | 'minheight';

const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;

class FocalPointMask extends HTMLElement {
  public onResize?: (evt: CustomEvent<ResizeObserverEntry[]>) => void;
  private target: HTMLElement | null;
  private strategy: Strategy;
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
    this.detectTarget();

    this.upgradeProperty('focalpoint');
    this.upgradeProperty('aspectratio');
    this.upgradeProperty('minheight');
    this.upgradeProperty('minwidth');

    const options = { childList: true, subtree: true };

    this.mutationObserver = new MutationObserver(() => {
      this.detectTarget();
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
    return this.strategy.hasNaturalAspectRatio
      ? this.strategy.getRatio(this)
      : parseAspectRatio(this.aspectRatio);
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

  private async detectTarget (): Promise<void> {
    this.strategy = detectStrategy(this);
    this.target = this.strategy.getTarget(this);

    this.handleChange();

    if (this.target != null && this.parsedAspectRatio == null) {
      await this.strategy.load(this);
      this.detectTarget();
    }
  }

  private handleChange (): void {
    if (this.target != null && this.parsedAspectRatio != null) {
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

      this.target.style.position = 'absolute';
      this.target.style.display = 'block';
      this.target.style.width = cropSides ? 'auto' : '100%';
      this.target.style.minWidth = `${minWidth}px`;
      this.target.style.height = cropSides ? '100%' : 'auto';
      this.target.style.minHeight = `${minHeight}px`;
      this.target.style.top = `${top}%`;
      this.target.style.left = `${left}%`;
      this.target.style.transform = `translate(${left * -1}%, ${top * -1}%)`;
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
