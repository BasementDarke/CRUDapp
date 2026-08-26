import { Component, inject } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from '@angular/router';
import { AuthServiceTs } from '../../../shared/services/auth.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-login-user',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login-user.html',
  styleUrl: './login-user.css',
})
export class LoginUser {
  formBuilder = inject(NonNullableFormBuilder);
  authService = inject(AuthServiceTs);
  router = inject(Router);


  readonly toastService = inject(ToastService);

  form = this.formBuilder.group({
    username: this.formBuilder.control<string>('', {
      validators: [Validators.required]
    }),
      password: this.formBuilder.control<string>('', {
        validators: [Validators.required]
    })
  });

  onSubmit(): void {
    if(this.form.invalid){
      this.toastService.show({message: "Please fill the form correctly.", classname:"bg-danger text-light", delay: 10000 })
      return
    }
    this.authService.loginPost({ 
        username: this.form.value.username!,
        password: this.form.value.password!
      })
      .subscribe(response => {
        this.toastService.show({message: "Login successful.", classname:"bg-success text-light", delay: 10000 })
        location.href='';
      });
  }

  logout(): void{
    this.toastService.show({message: "Logged out.", classname:"bg-success text-light", delay: 10000 })
  }
}
