import {WordYML} from './wordYML';

export class DocumentYML {
  source: string;
  words: WordYML[];

  constructor(source: string, words: WordYML[]) {
    this.source = source;
    this.words = words;
  }

  static fromData(data): DocumentYML {
    const source = data.source;
    const words = [];
    for (const word of data.words) {
      words.push(new WordYML(word.foreignWord, word.translations, word.test, word.usage));
    }
    return new DocumentYML(source, words);
  }
}
