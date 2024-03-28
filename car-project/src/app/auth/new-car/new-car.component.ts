import { Component } from '@angular/core';
import { Car } from 'src/app/model/car';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css'],
})
export class NewCarComponent {
  token = !!localStorage.getItem('token');

  carsList: Car[] = [];
  carObj: Car = {
    id: '',
    car_brand: '',
    car_model: '',
    car_year: '',
    description: '',
  };
  id: string = '';
  car_brand: string = '';
  car_model: string = '';
  car_year: string = '';
  description: string = '';

  constructor(private data: DataService) {}

  getAllCars() {
    this.data.getAllCars().subscribe(
      (res) => {
        this.carsList = res.map((car: any) => {
          const data = car.payload.doc.data();
          data.id = car.payload.doc.id;
          return data;
        });
      },
      (err) => {
        alert('Error while fetching car data');
      }
    );
  }

  resetForm() {
    this.id = '';
    this.car_brand = '';
    this.car_model = '';
    this.car_year = '';
    this.description = '';
  }

  addCar() {
    if (
      this.car_brand === '' ||
      this.car_model === '' ||
      this.car_year === '' ||
      this.description === ''
    ) {
      alert('Please fill all input fields!');
      return;
    }
    this.carObj.id = '';
    this.carObj.car_brand = this.car_brand;
    this.carObj.car_model = this.car_model;
    this.carObj.car_year = this.car_year;
    this.carObj.description = this.description;

    this.data.addCar(this.carObj);
    this.resetForm();
  }

  updateCar() {}

  deleteCar(car: Car) {
    if (
      window.confirm(
        `Are you sure you want to delete ${car.car_brand} ${car.car_model}?`
      )
    ) {
      this.data.deleteCar(car);
    }
  }
}
