function getAttr<A = string> (
  el: HTMLElement,
  attrName: A
): string | undefined {
  return el.getAttribute(String(attrName)) ?? undefined;
}

export default getAttr;
