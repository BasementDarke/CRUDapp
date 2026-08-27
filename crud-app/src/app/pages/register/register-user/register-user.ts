import { Component, inject } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceTs } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-register-user',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register-user.html',
  styleUrl: './register-user.css',
})
export class RegisterUser {
  formBuilder = inject(NonNullableFormBuilder);
  authService = inject(AuthServiceTs);
  router = inject(Router)
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
      this.authService.registerPost({ 
        username: this.form.value.username!,
        password: this.form.value.password!
      })
      .subscribe(response => {
        this.toastService.show({message: "Account registered.", classname:"bg-success text-light", delay: 10000 })
        this.router.navigateByUrl('login');
    });
  }
}
