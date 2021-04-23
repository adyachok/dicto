import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {State, StateFire} from '../models/firestore/stateFire';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  stateDbPath = 'states';

  constructor(private firestore: AngularFirestore) {
  }

  getStatesByType(state: State = State.SCHEDULED, limit: number = 20) {
    return this.firestore.collection(
      this.stateDbPath,
      ref => ref.where('state', '==', state).limit(limit)).get();
  }

  getWordState(wordId: string) {
    // https://cloud.google.com/firestore/docs/query-data/queries#web-v8_1
    // https://github.com/angular/angularfire/blob/master/docs/firestore/querying-collections.md
    return this.firestore.collection(
      this.stateDbPath,
      ref => ref.where('wordId', '==', wordId))
      .snapshotChanges();
  }

  createState(data: StateFire, callback?: (result) => void) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection(this.stateDbPath)
        .add(data)
        .then(res => callback ? callback(res) : console.log(res.id), err => reject(err));
    });
  }

  setAddedState(wordId: string) {
    return new Promise<any>((resolve, reject) => {
      const state = new StateFire(wordId);
      this.createState(Object.assign({}, state)).then((res) => console.log(res), err => reject(err));
    });
  }

  setScheduledState(wordId: string) {
    const state = new StateFire(wordId, State.SCHEDULED);
    this.createState(state);
  }

  setLearnedState(wordId: string) {
    const state = new StateFire(wordId, State.LEARNED);
    this.createState(state);
  }

  setToFirstRepeatState(wordId: string) {
    const state = new StateFire(wordId, State.REPEAT_1);
    this.createState(state);
  }

  setRepeatedFirstTimeState(wordId: string) {
    const state = new StateFire(wordId, State.REPEATED_1);
    this.createState(state);
  }

  setToSecondRepeatState(wordId: string) {
    const state = new StateFire(wordId, State.REPEAT_2);
    this.createState(state);
  }

  setRepeatedSecondTimeState(wordId: string) {
    const state = new StateFire(wordId, State.REPEATED_2);
    this.createState(state);
  }

  setToThirdRepeatState(wordId: string) {
    const state = new StateFire(wordId, State.REPEAT_3);
    this.createState(state);
  }

  setFinishedState(wordId: string) {
    const state = new StateFire(wordId, State.FINISHED);
    this.createState(state);
  }
}
