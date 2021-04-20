import {Word} from './dict-word';

export class DictDocument {
  source: string;
  words: Word[];

  constructor(source: string, words: Word[]) {
    this.source = source;
    this.words = words;
  }

  static fromData(data): DictDocument {
    const source = data.source;
    const words = [];
    for (const word of data.words) {
      words.push(new Word(word.word, word.translations, word.test, word.usage));
    }
    return new DictDocument(source, words);
  }
}
