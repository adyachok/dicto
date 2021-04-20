import {ChangeDetectorRef, Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {parse} from 'yaml';
import {Dictionary} from './models/dictionary';
import {EditWordDialogComponent} from './dialogs/edit-word-dialog/edit-word-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {DeleteWordDialogComponent} from './dialogs/delete-word-dialog/delete-word-dialog.component';
import {EditableWord} from './models/dict-word';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'read-json';
  dictionary: Dictionary;

  form = this.fb.group({
    file: [null, [Validators.required]]
  });

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, public dialog: MatDialog) {
  }

  submit() {
    console.log(this.form.value);
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
        console.log(result);
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
    console.log(evt);
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
          this.dictionary = Dictionary.fromData(data);
          console.log(this.dictionary);
        }
      };
    }
  }

}
