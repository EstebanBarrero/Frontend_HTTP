import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {UsuarioI} from '../../models/usuario.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit{

  constructor(private activerouter:ActivatedRoute, private router:Router){

  }

  ngOnInit(): void {
    let usuarioid = this.activerouter.snapshot.paramMap.get('document');
    console.log(usuarioid);
    let token = this.getToken();
    console.log(token)

  }

  getToken(){
    return localStorage.getItem('token');
  }

}
