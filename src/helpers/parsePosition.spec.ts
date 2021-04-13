import parsePosition from './parsePosition';

describe('parsePosition', () => {
  describe('single keyword', () => {
    it('should correctly parse top', () => {
      expect(parsePosition('top')).toStrictEqual([0, 0.5]);
    });

    it('should correctly parse bottom', () => {
      expect(parsePosition('bottom')).toStrictEqual([1, 0.5]);
    });

    it('should correctly parse left', () => {
      expect(parsePosition('left')).toStrictEqual([0.5, 0]);
    });

    it('should correctly parse right', () => {
      expect(parsePosition('right')).toStrictEqual([0.5, 1]);
    });

    it('should correctly parse center', () => {
      expect(parsePosition('center')).toStrictEqual([0.5, 0.5]);
    });
  });

  describe('keywords pair', () => {
    it('should correctly parse top left', () => {
      expect(parsePosition('top left')).toStrictEqual([0, 0]);
    });

    it('should correctly parse top center', () => {
      expect(parsePosition('top center')).toStrictEqual([0, 0.5]);
    });

    it('should correctly parse top right', () => {
      expect(parsePosition('top right')).toStrictEqual([0, 1]);
    });

    it('should correctly parse center left', () => {
      expect(parsePosition('center left')).toStrictEqual([0.5, 0]);
    });

    it('should correctly parse center center', () => {
      expect(parsePosition('center center')).toStrictEqual([0.5, 0.5]);
    });

    it('should correctly parse center right', () => {
      expect(parsePosition('center right')).toStrictEqual([0.5, 1]);
    });

    it('should correctly parse bottom left', () => {
      expect(parsePosition('bottom left')).toStrictEqual([1, 0]);
    });

    it('should correctly parse bottom center', () => {
      expect(parsePosition('bottom center')).toStrictEqual([1, 0.5]);
    });

    it('should correctly parse bottom right', () => {
      expect(parsePosition('bottom right')).toStrictEqual([1, 1]);
    });
  });

  describe('unordered keywords pair', () => {
    it('should correctly parse left top', () => {
      expect(parsePosition('left top')).toStrictEqual([0, 0]);
    });

    it('should correctly parse center top', () => {
      expect(parsePosition('center top')).toStrictEqual([0, 0.5]);
    });

    it('should correctly parse right top', () => {
      expect(parsePosition('right top')).toStrictEqual([0, 1]);
    });

    it('should correctly parse left center', () => {
      expect(parsePosition('left center')).toStrictEqual([0.5, 0]);
    });

    it('should correctly parse center center', () => {
      expect(parsePosition('center center')).toStrictEqual([0.5, 0.5]);
    });

    it('should correctly parse right center', () => {
      expect(parsePosition('right center')).toStrictEqual([0.5, 1]);
    });

    it('should correctly parse left bottom', () => {
      expect(parsePosition('left bottom')).toStrictEqual([1, 0]);
    });

    it('should correctly parse center bottom', () => {
      expect(parsePosition('center bottom')).toStrictEqual([1, 0.5]);
    });

    it('should correctly parse right bottom', () => {
      expect(parsePosition('right bottom')).toStrictEqual([1, 1]);
    });
  });

  describe('repeated keywords', () => {
    it('should return undefined given top top', () => {
      expect(parsePosition('top top')).toBeUndefined();
    });

    it('should return undefined given bottom bottom', () => {
      expect(parsePosition('bottom bottom')).toBeUndefined();
    });

    it('should return undefined given left left', () => {
      expect(parsePosition('left left')).toBeUndefined();
    });

    it('should return undefined given right right', () => {
      expect(parsePosition('right right')).toBeUndefined();
    });

    it('should correctly parse center center', () => {
      expect(parsePosition('center center')).toStrictEqual([0.5, 0.5]);
    });
  });

  describe('keywords of the same axis', () => {
    it('should return undefined given top bottom', () => {
      expect(parsePosition('top bottom')).toBeUndefined();
    });

    it('should return undefined given bottom top', () => {
      expect(parsePosition('bottom top')).toBeUndefined();
    });

    it('should return undefined given left right', () => {
      expect(parsePosition('left right')).toBeUndefined();
    });

    it('should return undefined given right left', () => {
      expect(parsePosition('right left')).toBeUndefined();
    });
  });

  describe('single percentage', () => {
    it('should correctly parse 75%', () => {
      expect(parsePosition('75%')).toStrictEqual([0.75, 0.5]);
    });
  });

  describe('percentages pair', () => {
    it('should correctly parse 0% 0%', () => {
      expect(parsePosition('0% 0%')).toStrictEqual([0, 0]);
    });

    it('should correctly parse 25% 75%', () => {
      expect(parsePosition('25% 75%')).toStrictEqual([0.25, 0.75]);
    });

    it('should correctly parse 75% -10%', () => {
      expect(parsePosition('75% -10%')).toStrictEqual([0.75, -0.1]);
    });
  });

  describe('unexpected values', () => {
    it('should correctly parse percentages with too many spaces', () => {
      expect(parsePosition(' 10%   20% ')).toStrictEqual([0.1, 0.2]);
    });

    it('should correctly parse keywords with too many spaces', () => {
      expect(parsePosition(' top   left ')).toStrictEqual([0, 0]);
    });

    it('should return undefined given mixed value types', () => {
      expect(parsePosition('top 70%')).toBeUndefined();
    });

    it('should return undefined given too many percentages', () => {
      expect(parsePosition('25% 50% 75%')).toBeUndefined();
    });

    it('should return undefined given too many keywords', () => {
      expect(parsePosition('top left left')).toBeUndefined();
    });

    it('should return undefined given an expected value', () => {
      expect(parsePosition('bogus')).toBeUndefined();
    });

    it('should return undefined given an expected percentage', () => {
      expect(parsePosition('bogus%')).toBeUndefined();
    });

    it('should return undefined without parameters', () => {
      expect(parsePosition()).toBeUndefined();
    });
  });
});
