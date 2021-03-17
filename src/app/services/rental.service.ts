import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LİstResponceModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl='https://localhost:44357/api/rentals/getrentaldetails'

  constructor(private httpClient:HttpClient) { }

  getrentals():Observable<LİstResponceModel<Rental>>{
    return this.httpClient.get<LİstResponceModel<Rental>>(this.apiUrl);
  }
}
