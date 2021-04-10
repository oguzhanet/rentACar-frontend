import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDto } from 'src/app/models/carDto';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { Rental } from 'src/app/models/rental';
import { User } from 'src/app/models/user';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css']
})
export class CarImageComponent implements OnInit {

  gunFarki:number=0;
  car!:CarDto;
  brand!:Brand;
  color!:Color;
  dateTimeNow:Date=new Date();
  rentDate:Date=this.dateTimeNow;
  rentEndDate:Date=this.dateTimeNow;
  cars:CarDto[]=[];
  users:User[]=[];
  images:CarImage[]=[];
  imagePaths:string[]=[];
  imageUrl="https://localhost:44357/";
  currentCar?:CarDto;

  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private carImageService:CarImageService,
    private rentalService:RentalService,
    private userService:UserService,
    private toastrService:ToastrService,
    private localStorage:LocalStorageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarsById(params['carId']);
        this.getImagesById(params['carId']);
        this.getUsersById();
      }
    });
  }

  setCurrentCar(car: CarDto) {
    this.currentCar = car;
  }

  getCarsById(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  getImagesById(Id: number) {
    this.carImageService.getCarImagesByCarId(Id).subscribe((response) => {
      this.images = response.data;
    });
  }

  rentCar(id: number) {
    let rental: Rental = {
      carId: id,
      customerId: 1003,
      rentDate: new Date(this.rentDate),
      rentEndDate: new Date(this.rentEndDate),
      returnDate: undefined,
    };
    this.rentalService.add(rental).subscribe((response) => {
      this.toastrService.info('Ödeme Sayfasına Yönlendiriliyorsunuz');
    });
  }

  etDiffBetweenDays() {
    var date1 = new Date(this.rentDate.toString());
    var date2 = new Date(this.rentEndDate.toString());
    var difference = date2.getTime() - date1.getTime();
    var gunFarki = Math.ceil(difference / (1000 * 3600 * 24)); 
  }

  isRentable(){
    if(this.cars[0].findeks<=this.users[0].findeks){
      return true;
    }
    return false;
  }

  getUsersById(){
    this.userService.getByUserId(Number(this.localStorage.getItem('userId'))).subscribe(response=>{
      this.users=response.data
    })
  }

}
