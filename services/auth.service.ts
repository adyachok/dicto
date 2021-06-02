import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';
import {Router} from '@angular/router';


@Injectable({
   providedIn: 'root'
})
// https://github.com/angular/angularfire/blob/master/docs/auth/getting-started.md
export class AuthService {

  constructor(public auth: AngularFireAuth, private router: Router) {
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(
        (userCredentials: firebase.auth.UserCredential) => {
          localStorage.setItem('currentUser', JSON.stringify(userCredentials.user));
          this.router.navigate(['']);
        });
  }

  logout() {
    this.auth.signOut();
    localStorage.removeItem('currentUser');
    this.router.navigate(['sign-in']);
  }

  getCurrentUser(): firebase.User {
    const currentUser =  localStorage.getItem('currentUser');
    if (currentUser == null) { return null; }
    return JSON.parse(currentUser) as firebase.User;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  getCurrentUserUID(): string {
    const currentUser = this.getCurrentUser();
    const providerData = currentUser.providerData;
    if (providerData !== null && providerData.length) {
      return providerData[0].uid;
    }
    return null;
  }

}
