import {DictDocument} from './dict-document';

export class Dictionary {
  name: string;
  description: string;
  documents: DictDocument[];

  constructor(name: string, description: string, documents: DictDocument[]) {
    this.name = name;
    this.description = description;
    this.documents = documents;
  }

  static fromData(data): Dictionary {
    const name = data.name;
    const description = data.description;
    const documents = [];
    console.log(data.documents);
    for (const doc of data.documents) {
      documents.push(new DictDocument(doc.source, doc.words));
    }
    return new Dictionary(name, description, documents);
  }
}
