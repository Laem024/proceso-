import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://nestjs-api-580897309192.us-central1.run.app';  // Cambia por la URL de tu API en producción

  constructor(private http: HttpClient) {}

  // Método para registrarse
  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, { name, email, password });
  }

  // Método para iniciar sesión
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      map((response: any) => {
        // Guardar el token JWT en el almacenamiento local
        localStorage.setItem('token', response.access_token);
        return response;
      })
    );
  }

  // Método para obtener el token del usuario autenticado
  getToken() {
    return localStorage.getItem('token');
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('token');
  }

  // Obtener nombres
  getUserNames(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/names`);
  }

  // Obtener emails
  getUserEmails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/emails`);
  }

  // Obtener nombres y emails
  getNamesAndEmails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/names_emails`);
  }
}
