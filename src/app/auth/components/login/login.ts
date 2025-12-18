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
import { Storage } from '../services/storage/storage';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

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

  constructor(private fb: FormBuilder, private authService: Auth, private router: Router, private message: NzMessageService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, Validators.required]
    })
  }

  login() {
    if(this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log(res)
        const token = res.token;
        const tokenDecoded: any = jwtDecode(token);

        if(res) {
          const user = {
            id: res.userId,
            username: res.username,
            role: tokenDecoded.role
          }
          Storage.saveToken(token);
          Storage.saveUser(user);
          if(Storage.isAdminLoggedIn()) {
            this.router.navigateByUrl("/admin/dashboard");
          } else if(Storage.isCustomerLoggedIn()) {
            this.router.navigateByUrl("/customer/dashboard");
          } else {
            this.message.error("ERRORE: Bad Credentials", {nzDuration: 50000});
          }
          
        }
      },
      error: (err) => {
        console.error('Errore nella login: ' + err);
      }
    });
  }
}
