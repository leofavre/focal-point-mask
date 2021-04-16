interface RecursiveGrab {
  (
    str: string,
    foundIndex?: number,
    sliceStart?: number,
    sections?: string[]
  ): string[]
}

const recursiveGrab: RecursiveGrab = (
  str,
  foundIndex = -1,
  sliceStart = 0,
  sections = []
) => {
  const nextSliceStart = foundIndex + sliceStart + 1;
  const currentStr = str.slice(nextSliceStart);
  const nextFoundIndex = currentStr.search(/[^#]## /gm);

  const currentSection = str.slice(...[
    nextSliceStart,
    nextFoundIndex !== -1
      ? nextSliceStart + nextFoundIndex + 1
      : undefined
  ]);

  const nextAccum = [...sections, currentSection];

  return (nextFoundIndex !== -1)
    ? recursiveGrab(str, nextFoundIndex, nextSliceStart, nextAccum)
    : nextAccum;
};

const grabMarkdownSections = (markDown: string): string[] =>
  recursiveGrab(markDown);

export default grabMarkdownSections;
