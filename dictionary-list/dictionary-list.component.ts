import {Component, OnInit} from '@angular/core';
import {DictionaryService} from '../services/dictionary.service';
import {DictionaryFire, Language} from '../models/firestore/dictionaryFire';
import {Router} from '@angular/router';
import {LearnService} from '../services/learn.service';
import {WordFire} from '../models/firestore/wordFire';

@Component({
  selector: 'app-dictionary-list',
  templateUrl: './dictionary-list.component.html',
  styleUrls: ['./dictionary-list.component.css']
})
export class DictionaryListComponent implements OnInit {

  dictionaries: DictionaryFire[] = [];
  // https://stackoverflow.com/questions/48768774/how-to-get-all-the-values-of-an-enum-with-typescript
  languages: string[];
  selectedLanguage: string;

  constructor(private dictionaryService: DictionaryService,
              private router: Router,
              private learnService: LearnService) { }

  getLanguageDictionaries(selectedLanguage: string) {
    // https://stackoverflow.com/questions/48705555/how-to-get-id-of-selected-value-in-mat-select-option-in-angular-5
    this.selectedLanguage = selectedLanguage;
    // https://stackoverflow.com/questions/17380845/how-do-i-convert-a-string-to-enum-in-typescript
    this.dictionaryService.getDictionariesByLanguage(Language[this.selectedLanguage])
      .subscribe((data) => {
      for (const doc of data) {
        const dict = doc.payload.doc.data() as DictionaryFire;
        dict.id = doc.payload.doc.id;
        this.dictionaries.push(dict);
      }
    });
  }

  learn(dictionaryIndex: number) {
    this.router.navigate(['/learn-words', this.dictionaries[dictionaryIndex].id]);
  }

  delete(dictionaryIndex: number) {}

  edit(dictionaryIndex: number) {}

  view(dictionaryIndex: number) {
    this.router.navigate(['/words', this.dictionaries[dictionaryIndex].id]);
  }

  ngOnInit(): void {
    this.languages = Object.values(Language);
  }

}
