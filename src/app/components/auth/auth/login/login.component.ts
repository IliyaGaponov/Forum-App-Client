import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { LoginRequest } from '../../../../models/auth/login.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorResponse: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let loginRequest: LoginRequest = this.loginForm.value;

      this.authService.login(loginRequest)
      .subscribe({
        next: (response) => {
          if (response) {
            this.authService.setToken(response.token);
            this.authService.setToSession(loginRequest.email, response.userName);
            this.router.navigate(['/forum']);
          }
        },
        error: (e) => this.errorResponse = e.error
      });
    }
  }
}
