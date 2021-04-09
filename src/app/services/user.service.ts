import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LİstResponceModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl='https://localhost:44357/api/';

  constructor(private httpClient:HttpClient) { }

  getUsers():Observable<LİstResponceModel<User>>{
    let newPath=this.apiUrl+"auth/getall"
    return this.httpClient.get<LİstResponceModel<User>>(newPath)
  }

  getByUserEmail(email:string):Observable<LİstResponceModel<User>>{
    let newPath=this.apiUrl+"auth/getbyemail?email="+email
    return this.httpClient.get<LİstResponceModel<User>>(newPath)
  }

  getByUserId(userId:number):Observable<LİstResponceModel<User>>{
    let newPath=this.apiUrl+"auth/getbyid?userId="+userId
    return this.httpClient.get<LİstResponceModel<User>>(newPath)
  }

  getByUserName(name:string):Observable<LİstResponceModel<User>>{
    let newPath=this.apiUrl+"auth/getbyname?name="+name
    return this.httpClient.get<LİstResponceModel<User>>(newPath)
  }

  update(user:User):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"auth/update",user)
  }
}
