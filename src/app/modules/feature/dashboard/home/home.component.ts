import { Component } from '@angular/core';

import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  userName!: string | null;

  constructor(private _auth: AuthService) {
    this._auth.getProfile();

    this.userName = localStorage.getItem('userName');
  }
}
