import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FakeCard } from '../models/fakeCard';
import { LİstResponceModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FakeCardService {

  apiUrl='https://localhost:44357/api/';

  constructor(private httpClient:HttpClient) { }

  isCardExist(fakeCard:FakeCard):Observable<ResponseModel>{
    let newPath=this.apiUrl+"fakecards/iscardexist";
    return this.httpClient.post<ResponseModel>(newPath,fakeCard)
  }

  getCardByNumber(cardNumber:string):Observable<LİstResponceModel<FakeCard>>{
    let newPath = this.apiUrl + "fakecards/getbycardnumber?cardnumber=" + cardNumber
    return this.httpClient.get<LİstResponceModel<FakeCard>>(newPath);
  }

  add(fakeCard:FakeCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"fakecards/add",fakeCard)
  }

  updateCard(fakeCard:FakeCard){
    let newPath = this.apiUrl + "fakecards/update"
    this.httpClient.put(newPath,fakeCard)
  }
}
