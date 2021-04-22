import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {WordFire} from '../models/firestore/wordFire';
import {StateService} from './state.service';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
  private wordsDbPath = 'words';


  constructor(private firestore: AngularFirestore, private stateService: StateService) {
  }

  getWords(dictionaryId: string) {
    // https://cloud.google.com/firestore/docs/query-data/queries#web-v8_1
    // https://github.com/angular/angularfire/blob/master/docs/firestore/querying-collections.md
    return this.firestore.collection(
      this.wordsDbPath,
      ref => ref.where('dictionaryId', '==', dictionaryId))
      .snapshotChanges();
  }

  createWord(data: WordFire) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection(this.wordsDbPath)
        .add(data)
        .then(res => {this.stateService.setAddedState(res.id); }, err => reject(err));
    });
  }

  updateWord(word: WordFire, callback?: (res) => void) {
    // console.log(word);
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection(this.wordsDbPath)
        .doc(word.id)
        .set({
          translations: word.translations, usage: word.usage, test: word.test,
          foreignWord: word.foreignWord, dictionaryId: word.dictionaryId
        })
        .then(res => callback ? callback(res) : console.log(res), err => reject(err));
    });
  }
}
