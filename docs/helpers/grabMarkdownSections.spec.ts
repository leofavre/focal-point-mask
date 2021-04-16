import grabMarkdownSections from './grabMarkdownSections';

const markDown = `
# title
some text.
## section one
### subtitle one
some other text.
### subtitle two
some other text.
## section two
still another text.
`;

const sectionOne = `
# title
some text.
`;

const sectionTwo = `
## section one
### subtitle one
some other text.
### subtitle two
some other text.
`;

const sectionThree = `
## section two
still another text.
`;

describe('grabMarkdownSections', () => {
  it('should return an array of sections', () => {
    expect(grabMarkdownSections(markDown)).toStrictEqual([
      sectionOne,
      sectionTwo.slice(1),
      sectionThree.slice(1)
    ]);
  });
});
