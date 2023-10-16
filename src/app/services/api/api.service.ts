import { Injectable } from '@angular/core';
import {LoginI} from '../../models/login.interface';
import {ResponseI} from '../../models/response.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable}  from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //Url en donde tengamos almacenado la api de pruebas
  url: string = "http://solodata.es/"

  constructor(private http:HttpClient) { }

  loginByEmail(form: LoginI): Observable<ResponseI>{
    let direction = this.url
    return
  }
}
