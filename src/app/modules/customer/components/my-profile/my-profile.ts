import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { Admin } from '../../../admin/services/admin';

@Component({
  selector: 'app-my-profile',
  imports: [
    NzSpinModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzLayoutModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzDatePickerModule
  ],
  templateUrl: './my-profile.html',
  styleUrl: './my-profile.scss',
})
export class MyProfile {

  isSpinning = false;
  userId!:number;
  updateForm!: FormGroup;

  constructor(private adminService: Admin,
    private activatedRoute: ActivatedRoute,
    private message: NzMessageService,
    private fb: FormBuilder,
    private router: Router) {}

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('user')!).id;
    this.updateForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      birthDate: [null, Validators.required],
      roleType: [null, Validators.required],
      enabled: [null, Validators.required]
    })
    this.getUserById();
  }

  getUserById() {
    this.isSpinning = true;
    this.adminService.getUserById(this.userId).subscribe({
      next: (res:any) => {
        this.isSpinning = false;
        const userDto = res;
        console.log(userDto);
        this.updateForm.patchValue({
          ...userDto,
          birthDate: userDto.birthDate ? new Date(userDto.birthDate) : null
        });
      },
      error: (err) => {
        this.message.error("Qualcosa è andato storto con il reperimento dei dati dell'utente.");
      }
    })
  }

  updateAnagrafica() {
    this.isSpinning = true;
    const payload = {
      firstName: this.updateForm.value.firstName,
      lastName: this.updateForm.value.lastName,
      birthDate: this.updateForm.value.birthDate,
      roleType: this.updateForm.value.roleType,
      enabled: this.updateForm.value.enabled
    }
    console.log(payload);
    this.adminService.updateCustomer(this.userId, payload).subscribe({
      next: (res:any) => {
        this.isSpinning = false;
        this.message.success("Anagrafica cliente aggiornata con successo!", {nzDuration: 5000});
        this.router.navigateByUrl("/customer/dashboard");
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this.message.error("C'è stato un errore durante l'aggiornamento dell'utente.", {nzDuration: 5000});
      }
    })
  }

  back() {
    this.router.navigateByUrl("/customer/dashboard");
  }
}
