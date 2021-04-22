import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DictionaryYML} from '../models/yaml/dictionaryYML';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DictionaryService} from '../services/dictionary.service';
import {EditWordDialogComponent} from '../dialogs/edit-word-dialog/edit-word-dialog.component';
import {EditableWord} from '../models/yaml/wordYML';
import {DeleteWordDialogComponent} from '../dialogs/delete-word-dialog/delete-word-dialog.component';
import {parse} from 'yaml';
import {DictionaryFire} from '../models/firestore/dictionaryFire';
import {WordsService} from '../services/words.service';
import {WordFire} from '../models/firestore/wordFire';
import {StateService} from '../services/state.service';

@Component({
  selector: 'app-new-dictionary-from-file',
  templateUrl: './new-dictionary-from-file.component.html',
  styleUrls: ['./new-dictionary-from-file.component.css']
})
export class NewDictionaryFromFileComponent {

  dictionary: DictionaryYML;

  form = this.fb.group({
    file: [null, [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private dictionaryService: DictionaryService,
    private  wordsService: WordsService) {}

  submit() {
    // Saves new dictionary and words in DB
    this.createDictionary(DictionaryFire.buildFromDictionaryYmlObject(this.dictionary), this.createWords);
  }

  edit(documentInDictionaryNum: number, wordInDocumentNum: number) {
    const word = this.dictionary.documents[documentInDictionaryNum].words[wordInDocumentNum];
    const dialogRef = this.dialog.open(EditWordDialogComponent, {
      data: {
        word,
        documentInDictionaryNum,
        wordInDocumentNum
      },
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('RESULT: ' + typeof(result));
      if (result !== undefined && result) {
        // console.log(result);
        const eword = result as EditableWord;
        this.dictionary.documents[eword.documentInDictionaryNum].words[eword.documentInDictionaryNum] = eword.word;
      }
    });
  }

  delete(documentInDictionaryNum: number, wordInDocumentNum: number) {
    const dialogRef = this.dialog.open(DeleteWordDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Deleted');
    });
  }

  processSelectedWord(evt) {
    // shoes.selectedOptions.selected[0]?.value
    // console.log(evt);
  }

  onFileChange(event) {
    // https://medium.com/@amcdnl/file-uploads-with-angular-reactive-forms-960fd0b34cb5
    // https://stackoverflow.com/questions/42099368/file-reader-telling-me-that-parameter-1-is-not-a-blob/42099672
    // https://stackoverflow.com/questions/58493735/how-to-get-data-of-yaml-file-in-the-angular-7-array-of-objects
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      // reader.readAsDataURL(file);
      reader.readAsText(file);
      // console.log(URL.createObjectURL(file));

      reader.onload = () => {
        this.form.patchValue({
          file: reader.result
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
        if (typeof reader.result === 'string') {
          const data = parse(reader.result);
          this.dictionary = DictionaryYML.fromData(data);
        }
      };
    }
  }

  getDictionaries() {
    this.dictionaryService.getDictionaries().subscribe((data) => {
      for (const doc of data) {
        console.log(doc.payload.doc.id);
        // console.log(doc.payload.doc.data() as WordFire);
      }
    });
  }

  createDictionary(data: any, callback?: (result) => void) {
    data = Object.assign({}, data);
    if (callback !== undefined) {
      // https://stackoverflow.com/questions/38245450/angular2-components-this-is-undefined-when-executing-callback-function
      this.dictionaryService.createDictionary(data, callback.bind(this)).then((result) => console.log(result));
    } else {
      this.dictionaryService.createDictionary(data).then((result) => console.log(result));
    }
  }

  createWords(dictionaryId: string) {
    // console.log(this);
    for (const doc of this.dictionary.documents) {
      for (const word of doc.words) {
        const fireWord = WordFire.buildFromWordYmlObject(word, dictionaryId, doc.source);
        this.wordsService.createWord(Object.assign({}, fireWord));
      }
    }
  }
}
