import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {ApiService} from '../../services/api/api.service';
import {LoginI} from '../../models/login.interface';
import {Router} from '@angular/router'
import {ResponseI} from '../../models/response.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm = new FormGroup({
    usuario: new FormControl('',Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private api:ApiService, private router: Router){}

  errorStatus:boolean = false;
  errorMsj:any = "";

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage(){
    if(localStorage.getItem('token')){
      this.router.navigate(['dashboard']);
    }
  }

  /*TODO: Activar: Login Thomas */
  onLogin(form: any) {
    this.router.navigate(['dashboard']);
    /*this.api.loginByEmail(form).subscribe(data =>{
      let dataResponse:ResponseI = data;
      if(!dataResponse.status){
        localStorage.setItem("token", dataResponse.result.token);
        this.router.navigate(['dashboard']);
      }else{
        this.errorStatus = true;
        this.errorMsj = dataResponse.result.error_msg;
      }
    });*/
  }
}
