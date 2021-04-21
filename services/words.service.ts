import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {DictionaryYML} from '../models/yaml/dictionaryYML';
import {WordFire} from '../models/firestore/wordFire';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
  private wordsDbPath = 'words';


  constructor(private firestore: AngularFirestore) { }

  getWords(dictionaryId: string) {
    // https://cloud.google.com/firestore/docs/query-data/queries#web-v8_1
    // https://github.com/angular/angularfire/blob/master/docs/firestore/querying-collections.md
    return this.firestore.collection(
      this.wordsDbPath,
        ref => ref.where('dictionaryId', '==', dictionaryId))
      .snapshotChanges();
  }

  createWord(data: WordFire, callback?: (result) => void) {
    return new Promise<any>((resolve, reject) => {
        this.firestore
            .collection(this.wordsDbPath)
            .add(data)
            .then(res => callback ? callback(res) : console.log(res.id), err => reject(err));
    });
  }
}