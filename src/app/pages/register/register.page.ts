import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  name: string='';
  email: string='';
  password: string='';

  constructor(private authService: AuthService, private router: Router) {}

  // Método para registrarse
  register() {
    this.authService.register(this.name, this.email, this.password).subscribe(
      () => {
        // Navegar a la página de inicio después del registro
        this.router.navigateByUrl('/home');
      },
      (err) => {
        console.error('Error en el registro:', err);
        alert('Error al registrarse');
      }
    );
  }
}
