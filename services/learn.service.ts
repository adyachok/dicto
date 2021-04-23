import {Injectable} from '@angular/core';
import {WordsService} from './words.service';
import {StateService} from './state.service';
import {State, StateFire} from '../models/firestore/stateFire';
import {WordFire} from '../models/firestore/wordFire';
import {LearnWordFire} from '../models/firestore/learnWordFire';

@Injectable({
  providedIn: 'root'
})
export class LearnService {

  dailyLearningRate = 10;

  constructor(private wordService: WordsService, private stateService: StateService) {
  }

  getWordsToLearn(dictionaryId: string): Promise<any> {
    // Selects words for learning with state SCHEDULED
    // if not enough for daily rate
    // select words for learning with state ADDED and create state for them as SCHEDULED
    let wordsStates: StateFire[];
    return new Promise((resolve, reject) => {
      this.getScheduledStates()
        .then((res) => {
          return this.getAddedStates(res);
        })
        .then((states) => {
          wordsStates = states;
          const ids: string[] = [];
          for (const state of states) {
            ids.push(state.wordId);
          }
          // const words = this.wordService.getWordsByIds(ids).toPromise();
          // resolve(words);
          return this.wordService.getWordsByIds(ids).toPromise();
        }).then((words) => {
        const learnWords: LearnWordFire[] = [];
        for (const doc of words.docs) {
          const word = doc.data() as WordFire;
          word.id = doc.id;
          // Create LearnWordFire objects merging WordFire and StateFire
          for (const state of wordsStates) {
            if (state.wordId === word.id) {
              const learnWord = new LearnWordFire(word, state);
              learnWords.push(learnWord);
            }
          }
          resolve(learnWords);
        }
      });
    });
  }

  getScheduledStates(): Promise<StateFire[]> {
    const receivedStates: StateFire[] = [];
    return new Promise((resolve, reject) => {
      this.stateService.getStatesByType()
        .toPromise()
        .then((result) => {
          for (const doc of result.docs) {
            const state = doc.data() as StateFire;
            receivedStates.push(state);
          }
          resolve(receivedStates);
        })
        .catch(err => reject(err));
    });
  }

  getAddedStates(res: StateFire[]): Promise<StateFire[]> {
    const receivedStates: StateFire[] = [];
    return new Promise((resolve, reject) => {
      if (res.length < this.dailyLearningRate) {
        const limit = this.dailyLearningRate - receivedStates.length;
        return this.stateService.getStatesByType(State.ADDED, limit).toPromise().then((result) => {
          for (const doc of result.docs) {
            const state = doc.data() as StateFire;
            receivedStates.push(state);
          }
          resolve(receivedStates);
        });
      }
    });
  }
}
