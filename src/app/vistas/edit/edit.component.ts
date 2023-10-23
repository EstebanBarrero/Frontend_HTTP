import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {UsuarioI} from '../../models/usuario.interface';
import {ApiService} from '../../services/api/api.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit{

  constructor(private activerouter:ActivatedRoute, private router:Router, private api: ApiService){

  }

  datosUsuario!: UsuarioI;
  editarFor = new FormGroup([
    
  ]);

  ngOnInit(): void {
    let usuarioid = this.activerouter.snapshot.paramMap.get('id');
    let token = this.getToken();
    this.api.getSigleUser(usuarioid).subscribe(data  =>{
      console.log(data)
    })
  }

  getToken(){
    return localStorage.getItem('token');
  }

}
