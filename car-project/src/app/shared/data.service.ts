import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Car } from '../model/car';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  addCar(car: Car) {
    car.id = this.afs.createId();
    return this.afs.collection('/Cars').add(car);
  }

  getAllCars() {
    return this.afs.collection('/Cars').snapshotChanges();
  }

  deleteCar(car: Car) {
    return this.afs.doc('/Cars/'+car.id).delete();
  }

  updateCar(car: Car) {
    this.deleteCar(car);
    this.addCar(car);
  }

}
