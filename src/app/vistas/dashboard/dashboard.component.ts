import { Component, OnInit } from '@angular/core';
import {ApiService}from '../../services/api/api.service';
import {Router} from '@angular/router';

import {ListaUsuariosI} from '../../models/listaUsuarios.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  users: ListaUsuariosI[] = [];
  pageNumber: number = 2; // Valor inicial

  constructor(private api:ApiService, private router:Router ){

  }

  cambiarNumero(numero: number) {
    this.pageNumber = numero;
  }


  ngOnInit(){
      this.api.getAllUsers(this.pageNumber).subscribe(data => {
      const values = Object.values(data);
      if (values.length >= 4) { // Verificar que el array tenga al menos 4 elementos
        this.users = values[3] as any;
        console.log(this.users.length);
        for (let i = 0; i < this.users.length; i++) {
          console.log(this.users[i]);
        }
      }
    });
  }



  editarUsuario(document: any){
    this.router.navigate(['edit', document]);
  }

  nuevoUsuario(){
    this.router.navigate(['nuevo']);
  }
}
