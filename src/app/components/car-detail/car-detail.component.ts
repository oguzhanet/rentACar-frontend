import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDto } from 'src/app/models/carDto';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carImages: CarImage[] = [];
  cars: CarDto[] = [];
  imagePaths:string[]=[];
  dataLoaded = false;
  apiUrl : string = "https://localhost:44357/";

  constructor(private carService: CarService,
    private carImageService:CarImageService,
    private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
      // this.activatedRoute.params.subscribe(params => {
      //   if (params["carId"]) {
      //     this.getCarDetailsByCarId(params["carId"]);
      //     this.getCarImagesByCarId(params["carId"]);
      //   } 
      // })

      this.getCars()
      this.getImages();
    }

    getCars(){
      this.carService.getCars().subscribe(response=>{
        this.cars=response.data
      })
    }

    getImages(){
      this.carImageService.getCarImage().subscribe(response=>{
        this.carImages=response.data
      })
    }

    getCarDetailsByCarId(carId:number){
      this.carService.getCarDetailsByCarId(carId).subscribe(response => {
        this.cars = response.data;
        this.dataLoaded = true;
      });
    }
  
    getCarImagesByCarId(carId:number){
      this.carImageService.getCarImagesByCarId(carId).subscribe(response => {
        this.carImages = response.data;
        this.dataLoaded = true;
      })
    }
  
    getSliderClassName(index:number){
      if(index == 0){
        return "carousel-item active";
      } else {
        return "carousel-item";
      }
    }

}
