import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

//NG ZORRO IMPORTS
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AdminRoutingModule } from "../../../modules/admin/admin-routing-module";
import { Auth } from '../services/auth/auth';

@Component({
  selector: 'app-login',
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
    AdminRoutingModule
],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  isSpinning:boolean = false;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: Auth) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, Validators.required]
    })
  }

  login() {
    console.log(this.loginForm.value)
    this.authService.login(this.loginForm.value).subscribe((res) => {
      console.log(res)
    })
  }
}
