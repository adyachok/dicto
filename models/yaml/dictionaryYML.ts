import {DocumentYML} from './documentYML';

export class DictionaryYML {
  name: string;
  description: string;
  documents: DocumentYML[];

  constructor(name: string, description: string, documents: DocumentYML[]) {
    this.name = name;
    this.description = description;
    this.documents = documents;
  }

  static fromData(data): DictionaryYML {
    const name = data.name;
    const description = data.description;
    const documents = [];
    // console.log(data.documents);
    for (const doc of data.documents) {
      documents.push(new DocumentYML(doc.source, doc.words));
    }
    return new DictionaryYML(name, description, documents);
  }
}
