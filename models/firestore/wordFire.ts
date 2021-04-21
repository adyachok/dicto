import {EditableWord, WordYML} from '../yaml/wordYML';

export class WordFire {
  id?: string;
  foreignWord: string;
  translations: string[];
  test: string;
  usage: string;
  dictionaryId?: string;
  documentSource: string;

  constructor(foreignWord: string, translations: string[], test: string,
              usage: string, documentSource: string, dictionaryId?: string, id?: string) {
    this.foreignWord = foreignWord;
    this.translations = translations;
    this.test = test ? test : '';
    this.usage = usage ? usage : '';
    this.documentSource = documentSource;
    if (dictionaryId !== undefined) {
      this.dictionaryId = dictionaryId;
    }
    if (id !== undefined) {
      this.id = id;
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

export class EditableFireWord extends EditableWord {
  word: WordFire;

  constructor(word: WordFire, documentInDictionaryNum: number, wordInDocumentNum: number) {
    super(word, documentInDictionaryNum, wordInDocumentNum);
    this.documentInDictionaryNum = documentInDictionaryNum;
    this.word = word;
    this.wordInDocumentNum = wordInDocumentNum;
  }
}
