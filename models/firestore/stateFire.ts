export class StateFire {
  wordId: string;
  state: State;
  createdAt: Date;

  constructor(wordId: string, state: State = State.ADDED, createdAt: Date = new Date()) {
    this.wordId = wordId;
    this.state = state;
    this.createdAt = createdAt;
  }
}

export enum State {
  ADDED = 'ADDED',
  SCHEDULED = 'SCHEDULED', LEARNED = 'LEARNED',
  REPEAT_1 = 'REPEAT_1', REPEATED_1 = 'REPEATED_1',
  REPEAT_2 = 'REPEAT_2', REPEATED_2 = 'REPEATED_2',
  REPEAT_3 = 'REPEAT_3', FINISHED = 'FINISHED'
}
