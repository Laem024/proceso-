import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

  // Efecto para manejar el login
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(action =>
        this.authService.login(action.email, action.password).pipe(
          map(response => AuthActions.loginSuccess({ token: response.token })),
          catchError(error => of(AuthActions.loginFailure({ error: error.message })))
        )
      )
    )
  );

  // Efecto para redirigir a la página de bienvenida después del login
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        map(() => this.router.navigate(['/home']))
      ),
    { dispatch: false }
  );

  // Efecto para manejar el registro
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(action =>
        this.authService.register(action.name, action.email, action.password).pipe(
          map(response => AuthActions.registerSuccess({ token: response.token })),
          catchError(error => of(AuthActions.registerFailure({ error: error.message })))
        )
      )
    )
  );

  // Efecto para redirigir a la página de bienvenida después del registro
  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        map(() => this.router.navigate(['/home']))
      ),
    { dispatch: false }
  );
}
