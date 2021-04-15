function setAttr<A = string> (
  el: HTMLElement,
  attrName: A,
  value: unknown
): void {
  if (value != null && value !== false) {
    const parsedValue = value === true ? '' : String(value);
    el.setAttribute(String(attrName), parsedValue);
  } else {
    el.removeAttribute(String(attrName));
  }
}

export default setAttr;
