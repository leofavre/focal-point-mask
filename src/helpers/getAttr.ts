interface CastFn<T> {
  (value: unknown): T
}

function getAttr<A = string, T = string> (
  el: HTMLElement,
  attr: A,
  userCastFn?: CastFn<T>
): T | undefined {
  const castFn = userCastFn || String as unknown as CastFn<T>;
  return castFn(el.getAttribute(String(attr)));
}

export default getAttr;
