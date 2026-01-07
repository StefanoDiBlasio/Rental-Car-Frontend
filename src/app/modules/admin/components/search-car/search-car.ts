import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormItemComponent, NzFormModule } from "ng-zorro-antd/form";
import { NzColDirective } from "ng-zorro-antd/grid";
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectComponent, NzSelectModule } from "ng-zorro-antd/select";
import { Admin } from '../../services/admin';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-car',
  imports: [
    NzFormItemComponent,
    NzFormModule,
    NzSelectModule,
    NzColDirective,
    CommonModule,
    NzTableModule,
    NzSpinModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzSelectComponent,
    RouterModule
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

  constructor(private fb: FormBuilder, private adminService: Admin, private message: NzMessageService){
    this.searchCarForm = this.fb.group({
      casaCostruttrice: [null],
      modello: [null],
      annoImmatricolazione: [null],
      autoType: [null],
      targa: [null]
    })

    this.getAllCars();
  }

  getAllCars(){
    this.isSpinning = true;
    this.adminService.getAllCars().subscribe({
      next: (res:any) => {
        console.log(res);
        this.isSpinning = false;
        this.cars = res.map((b:any) => ({
          ...b
        }))
      },
      error: () => {
        this.message.error("Qualcosa è andato storto nel reperimento delle auto.", {nzDuration: 5000})
      }
    })
  }

  searchCar(){
    this.isSpinning = true;
    const filters = { ...this.searchCarForm.value };
    filters.annoImmatricolazione = filters.annoImmatricolazione ? Number(filters.annoImmatricolazione) : null;
    this.adminService.searchFilteredCars(filters).subscribe({
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

  deleteCar(id:number) {
    console.log(id);
    this.adminService.deleteCar(id).subscribe({
      next: (res:any) => {
        this.getAllCars();
        this.message.success("Auto eliminata con successo!", {nzDuration: 5000})
      },
      error : (err) => {
        this.message.error("Si è verificato un errore nell'eliminazione dell'auto.")
      }
    })
  }
}
