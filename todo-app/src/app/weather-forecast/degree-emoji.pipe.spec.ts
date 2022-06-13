import { DegreeEmojiPipe } from './degree-emoji.pipe';

describe('DegreeEmojiPipe', () => {
  it('create an instance', () => {
    const pipe = new DegreeEmojiPipe();
    expect(pipe).toBeTruthy();
  });

  [40, 50, 60, 80, 100].forEach((temperature) => {
    it(`Shoud return "🔥" when value is 40 or above ['${temperature}']`, () => {
      const pipe = new DegreeEmojiPipe();
      expect(pipe.transform(40)).toBe('🔥');
    });
  });
});

[30, 32, 35, 39].forEach((temperature) => {
  it(`Shoud return "🥵" when value is between 30 and 40 ['${temperature}']`, () => {
    const pipe = new DegreeEmojiPipe();
    expect(pipe.transform(40)).toBe('🥵');
  });
});
