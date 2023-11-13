import { Injectable } from '@angular/core';
import { LoginI } from '../../models/login.interface';
import { ResponseI } from '../../models/response.interface';
import { ListaUsuariosI } from '../../models/listaUsuarios.interface';
import { UsuarioI } from '../../models/usuario.interface'
import { ListaRolesI } from '../../models/listaRoles.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // URL donde tengamos almacenado la API
  url: string = "http://asbackpython1.azurewebsites.net/";
  searchTerm: string = '';

  constructor(private http: HttpClient) { }

  getAllUsers(page: number): Observable<ListaUsuariosI[]> {
    let direction = `${this.url}api/users/?page=${page}`;
    return this.http.get<ListaUsuariosI[]>(direction);
  }

  getBaseUrl(): string {
    return this.url;
  }

  getSigleUser(id: any): Observable<UsuarioI> {
    let direction = `${this.url}api/users/${id}/`;
    console.log(direction);
    return this.http.get<UsuarioI>(direction);
  }

  getAllRoles(page: number): Observable<ListaRolesI[]> {
    let direction = `${this.url}api/roles/?page=${page}`;
    return this.http.get<ListaRolesI[]>(direction);
  }

  // Método para realizar el Put a la base de datos por medio de la URL
  putUser(form: UsuarioI): Observable<ResponseI> {
    let direction = `${this.url}api/users/${form.id}/`;
    return this.http.put<ResponseI>(direction, form);
  }

  setSearchTerm(term: string): void {
    this.searchTerm = term;
  }

  buildSearchUrl(): string {
    return `${this.url}api/users/filter/?text_to_search=${this.searchTerm}`;
  }

  searchUsers(): Observable<ListaUsuariosI[]> {
    let direction = this.buildSearchUrl();
    return this.http.get<ListaUsuariosI[]>(direction);
  }

  login(form: LoginI): Observable<ResponseI> {
    let direction = `${this.url}login/`;  // Ajusta la URL según la estructura de tu API
    return this.http.post<ResponseI>(direction, form);
  }
}
