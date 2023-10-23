import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {UsuarioI} from '../../models/usuario.interface';
import {ApiService} from '../../services/api/api.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit{

  constructor(private activerouter:ActivatedRoute, private router:Router, private api: ApiService){

  }

  datosUsuario!: UsuarioI;
  editarForm = new FormGroup({
    id: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    type_document: new FormControl(''),
    document: new FormControl(''),
    birthday: new FormControl(''),
    phone_number: new FormControl(''),
    is_active: new FormControl(''),
    register_date: new FormControl(''),
    address: new FormControl(''),
    user_image: new FormControl(''),
    role: new FormControl('')
});

  ngOnInit(): void {
    let usuarioid = this.activerouter.snapshot.paramMap.get('id');
    let token = this.getToken();
    this.api.getSigleUser(usuarioid).subscribe(data  =>{
      // Completar el objeto data con valores nulos o por defecto si es necesario
    const usuarioCompleto = {
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name ,
      type_document: data.type_document,
      document: data.document,
      birthday: data.birthday,
      phone_number: data.phone_number,
      is_active: data.is_active,
      register_date: data.register_date,
      address: data.address,
      user_image: data.user_image,
      role: data.role
    };
    this.editarForm.setValue(usuarioCompleto); // Asignar al formulario
    console.log(this.editarForm.value)
  })
  }

  getToken(){
    return localStorage.getItem('token');
  }

}
