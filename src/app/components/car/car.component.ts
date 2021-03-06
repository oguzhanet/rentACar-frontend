import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDto } from 'src/app/models/carDto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  filterText="";
  filterText1:number;
  filterText2:number;
  cars:CarDto[] = [];
  cars2:Car[]=[]
  colors : Color[] =[]
  brands :Brand[] = []
  dataLoaded=false;
  currentCar:CarDto;
  
  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private brandService:BrandService,
    private colorService:ColorService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"] && params["colorId"]){
        this.getCarFiltered(params["brandId"],params["colorId"])
      }
      else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }
      else if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"])
      }
      else{
        this.getCars()
        this.getColors()
        this.getBrands()
      }
    })
  }

  getCars(){
   this.carService.getCars().subscribe(response=>{
     this.cars=response.data
     this.dataLoaded=true;
   })
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
  }

  setCurrentCar(car:CarDto){
    this.currentCar=car;
  }

  getColors(){
    this.colorService.getColors().subscribe(response =>{
      this.colors = response.data
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response =>{
      this.brands = response.data
    })
  }

  getCarFiltered(brandId:number,colorId:number){
    this.carService.getCarFiltered(brandId,colorId).subscribe(response =>{
      console.log(response)
      this.cars=response.data;
      if(this.cars.length == 0){
      this.toastrService.info('Ara?? Bulunmamaktad??r.');
    }
    })
  }

  delete(id:number){
    this.carService.delete(id).subscribe(response=>{
      console.log(response)
      this.toastrService.info('Ara?? Silindi.');
    })
  }

  getAllCarClass(){
    if(!this.currentCar){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
    
  }

}
