import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { Admin } from '../../services/admin';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-update-customer',
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
  templateUrl: './update-customer.html',
  styleUrl: './update-customer.scss',
})
export class UpdateCustomer {

  isSpinning = false;
  userId!:number;
  updateForm!: FormGroup;

  roleTypes = ["SUPERADMIN", "CUSTOMER"];

  constructor(private adminService: Admin,
    private activatedRoute: ActivatedRoute,
    private message: NzMessageService,
    private fb: FormBuilder,
    private router: Router) {}

  ngOnInit() {
    this.userId = Number(this.activatedRoute.snapshot.params["id"]);
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
        this.message.error("Qualcosa è andato storto con il reperimento dei dati del cliente.");
      }
    })
  }

  updateCustomer() {
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
        this.router.navigateByUrl("/admin/dashboard");
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this.message.error("C'è stato un errore durante l'aggiornamento della targa.", {nzDuration: 5000});
      }
    })
  }
}
