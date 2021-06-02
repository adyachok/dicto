import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {EditWordDialogComponent} from './dialogs/edit-word-dialog/edit-word-dialog.component';
import {DeleteWordDialogComponent} from './dialogs/delete-word-dialog/delete-word-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {NewDictionaryFromFileComponent} from './new-dictionary-from-file/new-dictionary-from-file.component';
import {DictionaryListComponent} from './dictionary-list/dictionary-list.component';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {RouterModule, Routes} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {WordListComponent} from './word-list/word-list.component';
import {LearnWordsComponent} from './learn-words/learn-words.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {SignInComponent} from './sign-in/sign-in.component';
import {AuthGuardService} from './services/auth-guard.service';
import {AuthService} from './services/auth.service';
import {MatIconModule} from '@angular/material/icon';

const routes: Routes = [
  {path: '', component: DictionaryListComponent, canActivate: [AuthGuardService]},
  {path: 'sign-in', component: SignInComponent},
  {path: 'add-new-dict-from-file', component: NewDictionaryFromFileComponent, canActivate: [AuthGuardService]},
  {path: 'words/:id', component: WordListComponent, canActivate: [AuthGuardService]},
  {path: 'learn-words/:dictionaryId', component: LearnWordsComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  declarations: [
    AppComponent,
    EditWordDialogComponent,
    DeleteWordDialogComponent,
    NewDictionaryFromFileComponent,
    DictionaryListComponent,
    ToolbarComponent,
    WordListComponent,
    LearnWordsComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    MatOptionModule,
    MatSelectModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    AngularFireAuthModule,
    MatIconModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
