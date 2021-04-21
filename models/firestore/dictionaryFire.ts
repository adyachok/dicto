import {DictionaryYML} from '../yaml/dictionaryYML';

export class DictionaryFire {
  id?: string;
  name: string;
  description: string;
  language: Language;
  dateCreated: Date;

  constructor(name: string, description: string, language: Language, dateCreated = new Date(), id?: string) {
    if (id !== undefined) {
      this.id = id;
    }
    this.name = name;
    this.description = description;
    this.language = language;
    this.dateCreated = dateCreated;
  }

  static buildFromDictionaryYmlObject(dictYml: DictionaryYML) {
    return new DictionaryFire(
      dictYml.name,
      dictYml.description,
      Language.HUNGARIAN);
  }
}

export enum Language {ENGLISH = 'ENGLISH', HUNGARIAN = 'HUNGARIAN', GERMAN = 'GERMAN'}
