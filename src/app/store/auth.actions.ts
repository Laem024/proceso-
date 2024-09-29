import { createAction, props } from '@ngrx/store';

// Acción para hacer login
export const login = createAction('[Auth] Login', props<{ email: string; password: string }>());

// Acción cuando el login es exitoso
export const loginSuccess = createAction('[Auth] Login Success', props<{ token: string }>());

// Acción cuando el login falla
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

// Acción para hacer registro
export const register = createAction('[Auth] Register', props<{ name: string; email: string; password: string }>());

// Acción cuando el registro es exitoso
export const registerSuccess = createAction('[Auth] Register Success', props<{ token: string }>());

// Acción cuando el registro falla
export const registerFailure = createAction('[Auth] Register Failure', props<{ error: string }>());
