import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { RegisterRequest } from '../../../../models/auth/register.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  errorResponse: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    
  }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.registerForm.valid) {
      let registerRequest: RegisterRequest = this.registerForm.value;

      this.authService.register(registerRequest)
      .subscribe({
        next: (response) => {
          this.authService.setToken(response.token);
          this.authService.setToSession(registerRequest.email, response.userName)
          this.router.navigate(['/forum']);
        },
        error: (e) => this.errorResponse = e.error
      });
    }
  }
}
