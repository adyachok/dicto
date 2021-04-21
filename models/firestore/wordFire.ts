import {WordYML} from '../yaml/wordYML';

export class WordFire {
  foreignWord: string;
  translations: string[];
  test: string;
  usage: string;
  dictionaryId?: string;
  documentSource: string;

  constructor(foreignWord: string, translations: string[], test: string, usage: string, documentSource: string, dictionaryId?: string) {
    this.foreignWord = foreignWord;
    this.translations = translations;
    this.test = test ? test : '';
    this.usage = usage? usage : '';
    this.documentSource = documentSource;
    if (dictionaryId !== undefined) {
      this.dictionaryId = dictionaryId;
    }
  }

  static buildFromWordYmlObject(wordYml: WordYML, dictionaryId: string, documentSource: string) {
    return new WordFire(
      wordYml.foreignWord,
      wordYml.translations,
      wordYml.test,
      wordYml.usage,
      documentSource,
      dictionaryId);
  }
}
