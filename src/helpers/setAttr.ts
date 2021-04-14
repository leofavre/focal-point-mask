function setAttr<A> (el: HTMLElement, attr: A, value: unknown): void {
  if (value != null) {
    el.setAttribute(String(attr), String(value));
  } else {
    el.removeAttribute(String(attr));
  }
}

export default setAttr;
