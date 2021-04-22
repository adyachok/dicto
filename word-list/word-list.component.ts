import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {WordsService} from '../services/words.service';
import {EditableFireWord, WordFire} from '../models/firestore/wordFire';
import {ActivatedRoute} from '@angular/router';
import {EditWordDialogComponent} from '../dialogs/edit-word-dialog/edit-word-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.css']
})
export class WordListComponent implements OnInit, OnDestroy{

  dictionaryId: string;

  words: WordFire[] = [];
  private sub: any;

  constructor(private wordsService: WordsService,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

 edit(wordIndex: number) {
    const word = this.words[wordIndex];
    const dialogRef = this.dialog.open(EditWordDialogComponent, {
      data: {
        word,
        documentInDictionaryNum: undefined,
        wordIndex
      },
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('RESULT: ' + typeof(result));
      if (result !== undefined && result) {
        const eword = result as EditableFireWord;
        const editedWord = this.words[wordIndex];
        editedWord.foreignWord = eword.word.foreignWord;
        editedWord.usage = eword.word.usage;
        editedWord.translations = eword.word.translations;
        editedWord.test = eword.word.test;
        this.wordsService.updateWord(editedWord);
      }
    });
  }

  delete(wordIndex: number) {}


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.dictionaryId = params.id; // (+) converts string 'id' to a number

       this.wordsService.getWords(this.dictionaryId).subscribe((data) => {
        for (const doc of data) {
          const word = doc.payload.doc.data() as WordFire;
          word.id = doc.payload.doc.id;
          this.words.push(word);
        }
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
