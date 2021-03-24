import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { LİstResponceModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl='https://localhost:44357/api/';

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<LİstResponceModel<Car>>{
    let newPath=this.apiUrl+"cars/getcardetails"
    return this.httpClient.get<LİstResponceModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<LİstResponceModel<Car>>{
    let newPath=this.apiUrl+"cars/getdetailbybrandid?brandId="+brandId
    return this.httpClient.get<LİstResponceModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<LİstResponceModel<Car>>{
    let newPath=this.apiUrl+"cars/getdetailbycolorid?colorId="+colorId
    return this.httpClient.get<LİstResponceModel<Car>>(newPath);
  }

  getCarDetailsByCarId(carId:number):Observable<LİstResponceModel<Car>>{
    let newPath = this.apiUrl + "cars/getdetailbycarid?carId=" + carId;
    return this.httpClient.get<LİstResponceModel<Car>>(newPath);
  }

  add(car:Car):Observable<ResponseModel>{
   return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car)
  }

  update(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/update",car)
  }

  delete(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/delete",car)
  }
}
