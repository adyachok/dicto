import {DocumentYML} from './documentYML';
import {Language} from '../firestore/dictionaryFire';

export class DictionaryYML {
  name: string;
  description: string;
  language: Language;
  documents: DocumentYML[];
  createdAt: Date;
  updatedAt: Date;
  // Google user UID
  googleUID: string;

  constructor(name: string, description: string, language: Language, documents: DocumentYML[],
              googleUID: string, createdAt: Date = new Date(), updatedAt: Date = new Date()) {
    this.name = name;
    this.description = description;
    this.language = language;
    this.documents = documents;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.googleUID = googleUID;
  }

  static fromData(data, googleUID: string): DictionaryYML {
    const name = data.name;
    const description = data.description;
    // https://stackoverflow.com/questions/43804805/check-if-value-exists-in-enum-in-typescript
    // console.log(data.language);
    if (Object.values(Language).includes(data.language.toUpperCase())) {
      // https://stackoverflow.com/questions/17380845/how-do-i-convert-a-string-to-enum-in-typescript
      const language = Language[data.language.toUpperCase()];
      const documents = [];
      // console.log(data.documents);
      for (const doc of data.documents) {
        documents.push(new DocumentYML(doc.source, doc.words));
      }
      return new DictionaryYML(name, description, language, documents, googleUID);
    } else {
      throw Error('Language is not in the supported languages list!');
    }
  }
}
