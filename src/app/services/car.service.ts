import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { LİstResponceModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { CarDto } from '../models/carDto';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl='https://localhost:44357/api/';

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<LİstResponceModel<CarDto>>{
    let newPath=this.apiUrl+"cars/getcardetails"
    return this.httpClient.get<LİstResponceModel<CarDto>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<LİstResponceModel<CarDto>>{
    let newPath=this.apiUrl+"cars/getdetailbybrandid?brandId="+brandId
    return this.httpClient.get<LİstResponceModel<CarDto>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<LİstResponceModel<CarDto>>{
    let newPath=this.apiUrl+"cars/getdetailbycolorid?colorId="+colorId
    return this.httpClient.get<LİstResponceModel<CarDto>>(newPath);
  }

  getCarDetailsByCarId(carId:number):Observable<LİstResponceModel<CarDto>>{
    let newPath = this.apiUrl + "cars/getdetailbycarid?carId=" + carId;
    return this.httpClient.get<LİstResponceModel<CarDto>>(newPath);
  }

  getCarFiltered(brandId:number,colorId:number):Observable<LİstResponceModel<CarDto>>{
    let newPath=this.apiUrl+"cars/getbybrandandcolor?brandId="+brandId+"&colorId="+colorId
    return this.httpClient.get<LİstResponceModel<CarDto>>(newPath)
  }

  add(car:Car):Observable<ResponseModel>{
   return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car)
  }

  update(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/update",car)
  }

  delete(carId:number){
    let newpath=this.apiUrl+"cars/delete?carId="+carId
    return this.httpClient.post(newpath,carId)
  }


}
