export class WordYML {
  foreignWord: string;
  translations: string[];
  test: string;
  usage: string;

  constructor(foreignWord: string, translations: [], test: string, usage: string) {
    this.foreignWord = foreignWord;
    this.translations = translations;
    this.test = test;
    this.usage = usage;
  }
}

export class EditableWord {
  word: WordYML;
  documentInDictionaryNum: number;
  wordInDocumentNum: number;

  constructor(word: WordYML, documentInDictionaryNum: number, wordInDocumentNum: number) {
    this.documentInDictionaryNum = documentInDictionaryNum;
    this.word = word;
    this.wordInDocumentNum = wordInDocumentNum;
  }
}
