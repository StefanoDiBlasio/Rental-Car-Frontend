import { Component } from '@angular/core';
import { Admin } from '../../services/admin';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-car',
  imports: [
    NzSpinModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzLayoutModule,
    NzSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-car.html',
  styleUrl: './update-car.scss',
})
export class UpdateCar {

  isSpinning = false;
  carId!:number;
  updateForm!: FormGroup;

  listOfTypes = ["MINIVAN", "FURGONE", "SUV", "BERLINA"];

  constructor(private adminService: Admin,
     private activatedRoute: ActivatedRoute,
      private message: NzMessageService,
      private fb: FormBuilder,
      private router: Router) {}

  ngOnInit() {
    this.carId = Number(this.activatedRoute.snapshot.params["id"]);
    this.updateForm = this.fb.group({
      targa: [null, Validators.required]
    })
    this.getCarById();
  }

  getCarById() {
    this.isSpinning = true;
    this.adminService.getCarById(this.carId).subscribe({
      next: (res:any) => {
        this.isSpinning = false;
        const carDto = res;
        console.log(carDto);
        this.updateForm.patchValue(carDto);
      },
      error: (err) => {
        this.message.error("C'è stato un problema con il reperimento dei dati dell'auto.");
      }
    })
  }

  updateCar() {
    this.isSpinning = true;
    const payload = {
      targa: this.updateForm.value.targa
    }
    console.log(payload);
    this.adminService.updateCar(this.carId, payload).subscribe({
      next: (res:any) => {
        this.isSpinning = false;
        this.message.success("Targa auto aggiornata con successo!", {nzDuration: 5000});
        this.router.navigateByUrl("/admin/dashboard");
        console.log(res);
      },
      error: (err) => {
        this.message.error("C'è stato un errore durante l'aggiornamento della targa.", {nzDuration: 5000});
      }
    })
  }
}
