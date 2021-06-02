import {DictionaryYML} from '../yaml/dictionaryYML';

export class DictionaryFire {
  id?: string;
  name: string;
  description: string;
  language: Language;
  createdAt: Date;
  updatedAt: Date;
  // Google user UID
  googleUID: string;

  constructor(name: string, description: string, language: Language, googleUID: string,
              createdAt: Date = new Date(), updatedAt: Date = new Date(), id?: string) {
    if (id !== undefined) {
      this.id = id;
    }
    this.name = name;
    this.description = description;
    this.language = language;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.googleUID = googleUID;
  }

  static buildFromDictionaryYmlObject(dictYml: DictionaryYML) {
    return new DictionaryFire(
      dictYml.name,
      dictYml.description,
      Language.HUNGARIAN,
      dictYml.googleUID,
      dictYml.createdAt,
      dictYml.updatedAt);
  }
}

export enum Language {ENGLISH = 'ENGLISH', HUNGARIAN = 'HUNGARIAN', GERMAN = 'GERMAN'}
