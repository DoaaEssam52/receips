import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../../modules/feature/auth/services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  userName!: string | null;

  constructor(private _auth: AuthService, private router: Router) {
    this._auth.getProfile();

    this.userName = localStorage.getItem('userName');
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/auth/login');
  }
}
