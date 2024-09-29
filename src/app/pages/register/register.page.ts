import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
})
export class RegisterPage {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private store: Store, private router: Router) {}

  onRegister() {
    this.store.dispatch(AuthActions.register({ name: this.name, email: this.email, password: this.password }));
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
