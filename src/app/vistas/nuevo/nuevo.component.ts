import { Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';


import { ListaRolesI } from 'src/app/models/listaRoles.interface';
@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit {
  roles: any[] = [];
  searchTerm: string = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles() {
    this.api.userRoles().subscribe(data => {
      // Convertir el objeto a un array de objetos
      this.roles = Object.entries(data.roles).map(([rol_name, rol_count]) => ({
        rol_name,
        rol_count, // Puedes llenar esto con la descripción real si la tienes disponible
      }));
    });
  }

  //cambiar a dashboard de roles
  exit() {
    this.router.navigate(['dashboard']);
  }

}
