import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EditableWord, Word} from '../../models/dict-word';


@Component({
  selector: 'app-edit-word-dialog',
  templateUrl: './edit-word-dialog.component.html',
  styleUrls: ['./edit-word-dialog.component.css']
})
export class EditWordDialogComponent implements OnInit {

  editForm: FormGroup;

  // https://www.itsolutionstuff.com/post/how-to-dynamically-add-and-remove-form-fields-in-angularexample.html
  constructor(public dialogRef: MatDialogRef<EditWordDialogComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public eword: EditableWord) {
    this.editForm = this.createForm();
    // console.log(eword);
    for (const translation of eword.word.translations) {
      this.addExistingTranslation(translation);
    }
    // console.log(this.editForm.controls);
    // this.addNewTranslation();
  }

  createForm(): FormGroup {
        return this.fb.group({
            foreignWord: [this.eword.word.foreignWord, Validators.required],
            translations: this.fb.array([]),
            test: [this.eword.word.test, Validators.compose([Validators.required, Validators.minLength(2)])],
            usage: [this.eword.word.usage],
        });
    }

  translations(): FormArray {
    return this.editForm.get('translations') as FormArray;
  }

  newTranslation(): FormGroup {
      return this.fb.group({
      translation: ['', Validators.compose([Validators.required, Validators.minLength(2)])]});
  }

  existingTranslation(translation: string) {
    return this.fb.group({
      translation: [translation, Validators.required]});
  }

  addNewTranslation() {
    this.translations().push(this.newTranslation());
    console.log(this.editForm.controls);
  }

  addExistingTranslation(translation: string) {
     this.translations().push(this.existingTranslation(translation));
  }

  closeDialog() {
    // https://loiane.com/2017/08/angular-reactive-forms-trigger-validation-on-submit/
    const submittedData = this.editForm.value;
    console.log(submittedData);
    const translations: string[] = [];
    for (const translationObj of submittedData.translations) {
      const translation = translationObj.translation;
      translations.push(translation);
    }
    submittedData.translations = translations;
    console.log(submittedData);
    const result = {
      documentInDictionaryNum: this.eword.documentInDictionaryNum,
      wordInDocumentNum: this.eword.wordInDocumentNum,
      word: submittedData
    };
    this.dialogRef.close(result);
  }

  removeTranslation(i: number) {
    this.translations().removeAt(i);
  }

  isFormValid() {
    const controls = this.editForm.controls;
    const valid = Object.keys(this.editForm.controls).map(key => {
      return this.editForm.controls[key].status === 'VALID';
    });
    return valid.every((val) => val === true);
  }

  ngOnInit(): void { }

}
