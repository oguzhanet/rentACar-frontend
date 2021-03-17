import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { LİstResponceModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl="https://localhost:44357/api/brands/getall";

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<LİstResponceModel<Brand>>{
    return this.httpClient.get<LİstResponceModel<Brand>>(this.apiUrl);
  }
}
