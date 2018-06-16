import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, private route: Router) {
    this.user = afAuth.authState;
  }

  public sair() {
    this.afAuth.auth.signOut().then(() => {
      this.route.navigate(['/login']);
    });
  }
}
