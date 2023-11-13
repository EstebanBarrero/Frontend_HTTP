import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


import { ListaUsuariosI } from '../../models/listaUsuarios.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  users: ListaUsuariosI[] = [];
  pageNumber: number = 1; // Valor inicial
  searchTerm: string = '';
  filteredUsers: ListaUsuariosI[] = [];
  resultsPerPage: number = 10;
  pageTitle: string = 'CONTROL PANEL USERS';

  constructor(private http: HttpClient,private api: ApiService, private router: Router) {
    this.resultsPerPage = 10;
  }

  cambiarResultadosPorPagina() {
    this.pageNumber = 1; // Reiniciar la página a 1 cuando cambies el número de resultados por página
    this.cargarUsuarios();
  }

  //cambiar a dashboard de roles
  rolesDashboard() {
    this.router.navigate(['dashboard-roles']);
  }

  cambiarNumero(numero: number, event: Event) {
    event.preventDefault();
    this.pageNumber = numero;
    this.cargarUsuarios();
  }


  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.api.getAllUsers(this.pageNumber).subscribe((data: ArrayLike<unknown> | { [s: string]: unknown; }) => {
      const values = Object.values(data);
      if (values.length >= 4) {
        this.users = values[3] as any;
        this.filteredUsers = this.users; // Inicialmente, muestra todos los usuarios
      }
    });
  }

  editarUsuario(id: any) {
    console.log(id)
    this.router.navigate(['edit', id]);
  }

  nuevoUsuario() {
    this.router.navigate(['nuevo']);
  }


  buscarUsuarios() {
    if (this.searchTerm) {
      this.api.searchUsers();
      // Construye la URL de la solicitud
      const url = `http://127.0.0.1:8000/api/users/filter/?text_to_search=${this.searchTerm}`;

      // Realiza la petición GET
      this.http.get(url).subscribe(
        (response: any) => {
          if (response.users && Array.isArray(response.users)) {
            // Si existe la propiedad 'users' y es un array, asigna a filteredUsers
            this.filteredUsers = response.users as ListaUsuariosI[];
            console.log(response.users as ListaUsuariosI[]);
          } else {
            // Si no se cumple la estructura esperada, muestra un mensaje de advertencia o maneja según tus necesidades
            console.warn('La estructura de la respuesta no es la esperada:', response);

          }
        },
        (error) => {
          console.error('Error al realizar la búsqueda:', error);
          // Maneja el error según tus necesidades
        }
      );
    }
  }

}
