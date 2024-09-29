import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  userNames: string[] = [];
  userEmails: string[] = [];
  userNamesAndEmails: any[] = [];
  loading: boolean = false;

  constructor(private userService: UserService) {}

  // Método para ejecutar las consultas en paralelo
  fetchUserData() {
    this.loading = true;
    forkJoin({
      names: this.userService.getUserNames(),
      emails: this.userService.getUserEmails(),
      namesAndEmails: this.userService.getUserNamesAndEmails(),
    }).subscribe(
      (results) => {
        this.userNames = results.names;
        this.userEmails = results.emails;
        this.userNamesAndEmails = results.namesAndEmails;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching user data:', error);
        this.loading = false;
      }
    );
  }
}
