import {EditableWord, WordYML} from '../yaml/wordYML';

export class WordFire {
  id?: string;
  foreignWord: string;
  translations: string[];
  test: string;
  usage: string;
  dictionaryId?: string;
  documentSource: string;
  createdAt: Date;
  updatedAt: Date;
  googleUID: string;


  constructor(foreignWord: string, translations: string[], test: string,
              usage: string, documentSource: string, googleUID: string,
              dictionaryId?: string, id?: string,
              createdAt: Date = new Date(), updatedAt: Date = new Date()) {
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
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.googleUID = googleUID;
  }

  static buildFromWordYmlObject(wordYml: WordYML, dictionaryId: string, documentSource: string, googleUID: string) {
    return new WordFire(
      wordYml.foreignWord,
      wordYml.translations,
      wordYml.test,
      wordYml.usage,
      documentSource,
      googleUID,
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
