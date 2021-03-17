import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { LİstResponceModel } from '../models/listResponseModel';

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
}
