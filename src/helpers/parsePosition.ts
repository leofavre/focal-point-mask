export const TOP = 0;
export const BOTTOM = 100;
export const LEFT = 0;
export const RIGHT = 100;
export const CENTER = 50;

const HORIZONTAL_KEYWORD_MAP = {
  top: TOP,
  bottom: BOTTOM
};

const VERTICAL_KEYWORD_MAP = {
  left: LEFT,
  right: RIGHT
};

const KEYWORD_MAP = {
  ...HORIZONTAL_KEYWORD_MAP,
  ...VERTICAL_KEYWORD_MAP,
  center: CENTER
};

const HORIZONTAL_KEYWORDS = Object.keys(HORIZONTAL_KEYWORD_MAP);
const VERTICAL_KEYWORDS = Object.keys(VERTICAL_KEYWORD_MAP);
const KEYWORDS = Object.keys(KEYWORD_MAP);

interface ParsePosition {
  (position?: string): number[] | undefined;
}

const parsePosition: ParsePosition = (position = '') => {
  let [positionA, positionB, ...rest] = position
    .replace(/ +/g, ' ')
    .trim()
    .split(' ');

  if (rest.length > 0) {
    return undefined;
  }

  const isUsingKeywords = KEYWORDS.includes(positionA) &&
    (positionB == null || KEYWORDS.includes(positionB));

  if (isUsingKeywords) {
    if (positionA !== 'center' && positionA === positionB) {
      return undefined;
    }

    if (HORIZONTAL_KEYWORDS.includes(positionA) &&
     HORIZONTAL_KEYWORDS.includes(positionB)) {
      return undefined;
    }

    if (VERTICAL_KEYWORDS.includes(positionA) &&
     VERTICAL_KEYWORDS.includes(positionB)) {
      return undefined;
    }

    if (HORIZONTAL_KEYWORDS.includes(positionB) ||
      VERTICAL_KEYWORDS.includes(positionA)) {
      [positionA, positionB] = [positionB, positionA];
    }

    return [
      KEYWORD_MAP[positionA || 'center'],
      KEYWORD_MAP[positionB || 'center']
    ];
  }

  const isUsingPercentages = positionA.endsWith('%') &&
    (positionB == null || positionB.endsWith('%'));

  if (isUsingPercentages) {
    const percentageA = Number(positionA.slice(0, -1));

    const percentageB = positionB != null
      ? Number(positionB.slice(0, -1))
      : CENTER;

    if (!Number.isNaN(percentageA) && !Number.isNaN(percentageB)) {
      return [percentageA, percentageB];
    }
  }

  return undefined;
};

export default parsePosition;
