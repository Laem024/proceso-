import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://192.168.0.155:8090'; // Asegúrate de usar la URL correcta

  constructor(private http: HttpClient) {}

  // Obtener lista de nombres
  getUserNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/users/names`);
  }

  // Obtener lista de correos electrónicos
  getUserEmails(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/users/emails`);
  }

  // Obtener nombres y correos concatenados
  getUserNamesAndEmails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/names_emails`);
  }
}
