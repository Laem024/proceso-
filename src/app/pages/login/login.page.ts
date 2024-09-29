import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private store: Store, private router: Router) {}

  onLogin() {
    this.store.dispatch(AuthActions.login({ email: this.email, password: this.password }));
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
