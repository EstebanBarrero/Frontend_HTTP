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

  constructor(private api:ApiService, private router:Router ){

  }

  //TODO hacer que this.users solo almacene el array de usuarios
  //que este en Object.values(data) [3]
  ngOnInit(): void {
    this.api.getAllUsers(1).subscribe(data => {
      this.users = Object.values(data);
      console.log(this.users[3]);
    });

  }

  editarUsuario(first_name: any){
    this.router.navigate(['edit', first_name]);
  }

  nuevoUsuario(){
    this.router.navigate(['nuevo']);
  }
}
