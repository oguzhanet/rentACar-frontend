import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { LİstResponceModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl='https://localhost:44357/api/colors/getall';

  constructor(private httpClient:HttpClient) { }

  getColors():Observable<LİstResponceModel<Color>>{
    return this.httpClient.get<LİstResponceModel<Color>>(this.apiUrl);
  }
}
