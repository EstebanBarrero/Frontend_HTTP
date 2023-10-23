import { Injectable } from '@angular/core';
import {LoginI} from '../../models/login.interface';
import {ResponseI} from '../../models/response.interface';
import {ListaUsuariosI} from '../../models/listaUsuarios.interface';
import {UsuarioI} from '../../models/usuario.interface'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable}  from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //Url en donde tengamos almacenado la api de pruebas
  url: string = "http://127.0.0.1:8000/"

  constructor(private http:HttpClient) { }

  loginByEmail(form: LoginI): Observable<ResponseI>{
    let direction = this.url
    return this.http.post<ResponseI>(direction,form);
  }

  getAllUsers(page:number): Observable<ListaUsuariosI[]>{
    let direction = this.url + "api/users/?page=" + page
    return this.http.get <ListaUsuariosI[]>(direction);
  }

  getSigleUser(id : any): Observable<UsuarioI>{
    let direction = this.url + "api/users/" + id + "/"
    console.log(direction);
    return this.http.get<UsuarioI>(direction);
  }

}
