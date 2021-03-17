import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { LİstResponceModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  apiUrl='https://localhost:44357/api/';

  constructor(private httpClient:HttpClient) { }

  getCarImage():Observable<LİstResponceModel<CarImage>>{
    let newPath=this.apiUrl+"carimages/getall";
    return this.httpClient.get<LİstResponceModel<CarImage>>(newPath);
  }

  getCarImagesByCarId(carId:number):Observable<LİstResponceModel<CarImage>>{
    let newPath=this.apiUrl+"carimages/getbycarid?carId="+carId
    return this.httpClient.get<LİstResponceModel<CarImage>>(newPath);
  }
}
