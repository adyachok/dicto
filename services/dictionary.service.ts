import { Injectable } from '@angular/core';
import {DictionaryYML} from '../models/yaml/dictionaryYML';
import {AngularFirestore} from '@angular/fire/firestore';
import {Language} from '../models/firestore/dictionaryFire';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private dictionariesDbPath = 'dictionaries';


  constructor(private firestore: AngularFirestore) { }

  getDictionaries() {
    return this.firestore.collection(this.dictionariesDbPath).snapshotChanges();
  }

  createDictionary(data: DictionaryYML, callback?: (result) => void) {
    return new Promise<any>((resolve, reject) => {
        this.firestore
            .collection(this.dictionariesDbPath)
            .add(data)
            .then(res => callback ? callback(res.id) : console.log(res.id), err => reject(err));
    });
  }

  getDictionariesByLanguage(lang: Language) {
    return this.firestore.collection(this.dictionariesDbPath, ref => ref.where('language', '==', lang)).snapshotChanges();
  }
}
