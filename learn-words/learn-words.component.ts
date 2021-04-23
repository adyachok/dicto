import {Component, OnDestroy, OnInit} from '@angular/core';
import {LearnService} from '../services/learn.service';
import {ActivatedRoute} from '@angular/router';
import {LearnWordFire} from '../models/firestore/learnWordFire';

@Component({
  selector: 'app-learn-words',
  templateUrl: './learn-words.component.html',
  styleUrls: ['./learn-words.component.css']
})
export class LearnWordsComponent implements OnInit, OnDestroy {

  dictionaryId: string;
  private sub: any;
  learnWords: LearnWordFire[];

  constructor(private learnService: LearnService, private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.dictionaryId = params.id;

      this.learnService.getWordsToLearn(this.dictionaryId).then((res) => {
        console.log(res);
        this.learnWords = res;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
