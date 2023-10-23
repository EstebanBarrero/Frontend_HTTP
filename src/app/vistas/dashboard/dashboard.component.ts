import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';

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


  constructor(private api: ApiService, private router: Router) {
    this.resultsPerPage = 10; 
  }

  cambiarResultadosPorPagina() {
    this.pageNumber = 1; // Reiniciar la página a 1 cuando cambies el número de resultados por página
    this.cargarUsuarios();
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
    this.api.getAllUsers(this.pageNumber).subscribe((data) => {
      const values = Object.values(data);
      if (values.length >= 4) {
        this.users = values[3] as any;
        this.filteredUsers = this.users; // Inicialmente, muestra todos los usuarios
      }
    });
  }

  editarUsuario(document: any) {
    this.router.navigate(['edit', document]);
  }

  nuevoUsuario() {
    this.router.navigate(['nuevo']);
  }

  //search function
  onSearch() {
    this.filteredUsers = this.users.filter((user) => {
      return (
        user.first_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }
}
