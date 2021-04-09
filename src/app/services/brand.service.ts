import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { LİstResponceModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl="https://localhost:44357/api/";

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<LİstResponceModel<Brand>>{
    let newPath=this.apiUrl+"brands/getall"
    return this.httpClient.get<LİstResponceModel<Brand>>(newPath);
  }

  add(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"brands/add",brand)
   }

   update(brand:Brand):Observable<ResponseModel>{
     return this.httpClient.post<ResponseModel>(this.apiUrl+"brands/update",brand)
   }

   getByBrandId(brandId:number):Observable<LİstResponceModel<Brand>>{
     let newPath=this.apiUrl+"brands/getbybrandid?brandId="+brandId
     return this.httpClient.get<LİstResponceModel<Brand>>(newPath)
   }
}
