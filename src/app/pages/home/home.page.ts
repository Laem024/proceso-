// import { Component } from '@angular/core';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.page.html',
//   styleUrls: ['./home.page.scss'],
// })
// export class HomePage {
//   names: string[] = [];  // Almacenar solo los nombres
//   emails: string[] = [];  // Almacenar solo los correos
//   combined: { name: string, email: string }[] = [];  // Nombres y correos combinados (de los 2 endpoints separados)

//   constructor(private authService: AuthService) {}

//   // Método para ejecutar las solicitudes en paralelo
//   async fetchDataInParallel() {
//     try {
//       // Ejecutar las solicitudes en paralelo
//       const [names, emails, combinedResult] = await Promise.all([
//         this.authService.getUserNames().toPromise(),         // Primer endpoint: obtener nombres
//         this.authService.getUserEmails().toPromise(),        // Segundo endpoint: obtener correos
//         this.authService.getNamesAndEmails().toPromise()     // Tercer endpoint: obtener nombres y correos en paralelo
//       ]);

//       // Asignar los resultados individuales
//       this.names = names;
//       this.emails = emails;

//       // Asignar el resultado combinado a la tercera lista (si es necesario concatenar nombres y correos desde el backend)
//       this.combined = combinedResult.names.map((name: string, index: number) => ({
//         name,
//         email: combinedResult.emails[index] || ''
//       }));
//     } catch (error) {
//       console.error('Error al obtener los datos:', error);
//     }
//   }
// }


import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  names: string[] = [];  // Almacenar solo los nombres
  emails: string[] = [];  // Almacenar solo los correos
  combined: { name: string, email: string }[] = [];  // Nombres y correos combinados

  constructor(private authService: AuthService, private router: Router) {}

  // Método para ejecutar las solicitudes en paralelo
  async fetchDataInParallel() {
    try {
      const [names, emails, combinedResult] = await Promise.all([
        this.authService.getUserNames().toPromise(),
        this.authService.getUserEmails().toPromise(),
        this.authService.getNamesAndEmails().toPromise()
      ]);

      this.names = names;
      this.emails = emails;
      this.combined = combinedResult.names.map((name: string, index: number) => ({
        name,
        email: combinedResult.emails[index] || ''
      }));
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout();  // Llamar al servicio para eliminar el token
    this.router.navigateByUrl('/login');  // Redirigir a la página de login
  }
}
