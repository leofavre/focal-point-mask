interface ParseAspectRatio {
  (aspectRatio?: string): number | undefined;
}

const parseAspectRatio: ParseAspectRatio = (aspectRatio = '') => {
  if (aspectRatio.includes('-')) {
    return undefined;
  }

  const [maybeWidth, maybeHeight, ...rest] = aspectRatio
    .split('/')
    .map(Number);

  if (rest.length > 0) {
    return undefined;
  }

  if (maybeWidth === 0 || maybeHeight === 0) {
    return undefined;
  }

  return maybeWidth / (maybeHeight || 1) || undefined;
};

export default parseAspectRatio;
