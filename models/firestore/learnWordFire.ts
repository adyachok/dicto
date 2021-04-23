import {WordFire} from './wordFire';
import {StateFire} from './stateFire';

export class LearnWordFire {
  word: WordFire;
  state: StateFire;

  constructor(word: WordFire, state: StateFire) {
    this.word = word;
    this.state = state;
  }
}
