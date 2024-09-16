import { Component } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RegisterComponent, LoginComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  isLoginVisible: boolean = true;

  showRegister() {
    this.isLoginVisible = false;
  }
  showLogin() {
    this.isLoginVisible = true;
  }
}
