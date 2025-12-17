import { Component } from '@angular/core';

//NG ZORRO IMPORTS
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Admin } from '../../services/admin';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-car',
  imports: [
    NzSpinModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzLayoutModule,
    NzSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './post-car.html',
  styleUrl: './post-car.scss',
})
export class PostCar {

  postCarForm!: FormGroup;
  isSpinning: boolean = false;

  listOfTypes = ["MINIVAN", "FURGONE", "SUV", "BERLINA"];

  constructor(private fb: FormBuilder,
    private adminService: Admin,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.postCarForm = this.fb.group({
      casaCostruttrice: [null, Validators.required],
      modello: [null, Validators.required],
      autoType: [null, Validators.required],
      annoImmatricolazione: [null, Validators.required],
      targa: [null, Validators.required]
    })
  }

  postCar() {
    if (this.postCarForm.invalid) {
      return;
    }
    console.log(this.postCarForm.value);
    this.isSpinning = true;
    const value = this.postCarForm.getRawValue();
    const payload = {
      casaCostruttrice: value.casaCostruttrice,
      modello: value.modello,
      autoType: value.autoType,
      annoImmatricolazione: value.annoImmatricolazione,
      targa: value.targa
    }
    console.log(payload);
    this.adminService.postCar(payload).subscribe({
      next: (res:any) => {
        this.isSpinning = false;
        this.message.success("Auto aggiunta con successo!", {nzDuration: 5000});
        this.router.navigateByUrl("/admin/dashboard");
        console.log(res);
      }, error: (err) => {
      this.message.error("C'è stato un errore durante l'inserimento dell'auto.", {nzDuration: 5000});
      }
    })
  }
}
