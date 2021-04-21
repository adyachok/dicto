import {Component, OnInit} from '@angular/core';
import {DictionaryService} from '../services/dictionary.service';
import {DictionaryFire, Language} from '../models/firestore/dictionaryFire';

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

  constructor(private dictionaryService: DictionaryService) { }

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

  delete(dictionaryIndex: number) {}

  edit(dictionaryIndex: number) {}

  view(dictionaryIndex: number) {}

  ngOnInit(): void {
    this.languages = Object.values(Language);
  }

}
