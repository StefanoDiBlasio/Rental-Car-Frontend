import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

//NG ZORRO IMPORTS
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { Auth } from '../services/auth/auth';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzSpinModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzLayoutModule,
    NzDatePickerModule
],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  isSpinning:boolean = false;
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder,
      private authService:Auth,
      private message: NzMessageService,
      private router: Router) {}

  ngOnInit(){
    this.signupForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidate]],
      birthDate: [null, [Validators.required]]
    })
  }

  confirmationValidate = (control : FormControl): { [s: string]: boolean} => {
    if(!control.value) {
      return { required:true }; 
    } else if(control.value !== this.signupForm.controls['password'].value) {
      return { confirm: true, error: true}
    }
    return {};
  } 

  register(){
    console.log(this.signupForm.value)
      if (this.signupForm.invalid) {
      return;
    }

    const formValue = this.signupForm.value;

    const payload = {
    ...formValue,
    birthDate: this.formatDate(formValue.birthDate)
    };

    console.log(payload);

    this.authService.register(payload).subscribe({
      next: (res) => {
        if(res.id != null) {
          this.message.success("Registrazione avvenuta con successo!", {nzDuration: 5000});
          this.router.navigateByUrl("/login")
        }
        console.log('Registrazione OK', res);
      },
      error: (err) => {
        this.message.error('Qualcosa è andato storto!', {nzDuration: 5000})
        console.error('Errore registrazione', err);
      }
    })
  
  }

  private formatDate(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}
}
