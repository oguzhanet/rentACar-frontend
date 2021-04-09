import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { LİstResponceModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl='https://localhost:44357/api/customers/';

  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<LİstResponceModel<Customer>>{
    let newPath=this.apiUrl+"getcustomerdetail"
    return this.httpClient.get<LİstResponceModel<Customer>>(newPath);
  }
}
