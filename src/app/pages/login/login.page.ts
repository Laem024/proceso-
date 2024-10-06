import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string ='';
  password: string='';

  constructor(private authService: AuthService, private router: Router) {}

  // Método para iniciar sesión
  login() {
    this.authService.login(this.email, this.password).subscribe(
      () => {
        // Navegar a la página de inicio si el login es exitoso
        this.router.navigateByUrl('/home');
      },
      (err) => {
        console.error('Error en el login:', err);
        alert('Credenciales incorrectas');
      }
    );
  }
}
