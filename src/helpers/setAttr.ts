function setAttr<A = string> (el: HTMLElement, attr: A, value: unknown): void {
  if (value != null && value !== false) {
    const parsedValue = value === true ? '' : String(value);
    el.setAttribute(String(attr), parsedValue);
  } else {
    el.removeAttribute(String(attr));
  }
}

export default setAttr;
