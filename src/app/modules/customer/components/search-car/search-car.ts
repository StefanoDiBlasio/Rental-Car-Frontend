import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormItemComponent, NzFormModule } from 'ng-zorro-antd/form';
import { NzColDirective } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule, NzSelectComponent } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Customer } from '../../services/customer';
import { AdminRoutingModule } from '../../../admin/admin-routing-module';

@Component({
  selector: 'app-search-car',
  imports: [
    NzFormItemComponent,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzColDirective,
    CommonModule,
    NzTableModule,
    NzSpinModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzSelectComponent,
    AdminRoutingModule
  ],
  templateUrl: './search-car.html',
  styleUrl: './search-car.scss',
})
export class SearchCar {

  isSpinning = false;
  searchCarForm!: FormGroup;
  cars: any = [];
  listOfBrands = ["Volkswagen", "Audi", "KIA", "Honda"];
  listOfModels = ["Golf 1.5 TSI Edition Plus", "A3 TDI Sportback", "Sportage 1.5 GPL", "Civic FK7 1.5"];
  listOfTypes = ["MINIVAN", "FURGONE", "SUV", "BERLINA"];
  listOfAnni = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

  constructor(private fb: FormBuilder, private customerService: Customer, private message: NzMessageService){
    this.searchCarForm = this.fb.group({
      casaCostruttrice: [null],
      modello: [null],
      annoImmatricolazione: [null],
      autoType: [null],
      targa: [null]
    })
  }

  searchCar(){
    this.isSpinning = true;
    const filters = { ...this.searchCarForm.value };
    filters.annoImmatricolazione = filters.annoImmatricolazione ? Number(filters.annoImmatricolazione) : null;
    this.customerService.searchFilteredCars(filters).subscribe({
      next: (res:any) => {
        this.cars = [];
        console.log(res);
        this.isSpinning = false;
        res.forEach((car:any) => {
          this.cars.push(car);
        });
        this.message.success("Ricerca filtrata con successo!", {nzDuration:5000});
      },
      error: () => {
        this.message.error("Qualcosa è andato storto durante la ricerca filtrata.", {nzDuration:5000});
      }
    })
  }
}
