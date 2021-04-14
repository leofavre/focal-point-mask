function getAttr<A, T> (
  el: HTMLElement,
  attr: A,
  castFn: (arg: string | null) => T
): T | undefined {
  return castFn(el.getAttribute(String(attr))) || undefined;
}

export default getAttr;
