import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/model/car';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  token = !!localStorage.getItem('token');

  carsList: Car[] = [];
  carObj : Car = {
    id: '',
    car_brand: '',
    car_model: '',
    car_year: '',
    description: ''
  };
  id: string = '';
  car_brand: string = '';
  car_model: string = '';
  car_year: string = '';
  description: string = '';

  constructor (private data: DataService) {}

  ngOnInit(): void {
    this.getAllCars();
  }

  getAllCars() {
    this.data.getAllCars().subscribe(res => {
      this.carsList = res.map((car: any) => {
        const data = car.payload.doc.data();
        data.id = car.payload.doc.id;
        return data;
      })
    }, err => {
      alert('Error while fetching car data')
    })
  }

  addCar() {

  }

  updateCar() {

  }

  deleteCar(car : Car) {
    if(window.confirm(`Are you sure you want to delete ${car.car_brand} ${car.car_model}?`)) {
      this.data.deleteCar(car);
    }
  }


}
