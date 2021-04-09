import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LİstResponceModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDto } from '../models/rentalDto';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl='https://localhost:44357/api/rentals/'

  constructor(private httpClient:HttpClient) { }

  getrentals():Observable<LİstResponceModel<RentalDto>>{
    let newPath=this.apiUrl+"getrentaldetails"
    return this.httpClient.get<LİstResponceModel<RentalDto>>(newPath);
  }

  add(rental:Rental):Observable<ResponseModel>{
    let newPath=this.apiUrl+"add"
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }
}
