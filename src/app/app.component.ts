import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor() {
    const config = {
      apiKey: 'AIzaSyBpSN7daJwGEt25pK3asQzd1NEa6zzKs4I',
      authDomain: 'todotime-9d717.firebaseapp.com',
      databaseURL: 'https://todotime-9d717.firebaseio.com',
      projectId: 'todotime-9d717',
      storageBucket: 'todotime-9d717.appspot.com',
      messagingSenderId: '250857463289',
      appId: '1:250857463289:web:5e274ed47799bf4ef6f128'
    };

    firebase.initializeApp(config);
  }
}
