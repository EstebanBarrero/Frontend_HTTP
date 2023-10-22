import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { LoginI } from '../../models/login.interface';
import { Router } from '@angular/router';
import { ResponseI } from '../../models/response.interface';
import { HttpClient } from '@angular/common/http';

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

  constructor(private api: ApiService, private router: Router, private http: HttpClient) { }

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

  onLogin(form: any) {

    const document = form.usuario;
    const password = form.password;
    
    const data = { document, password };
  
    this.http.post('http://127.0.0.1:8000/login', data).subscribe(
      (response: any) => {
        // Maneja la respuesta del servidor
        if (response.access_token) {
          // Si se obtiene un token de acceso, almacénalo en el almacenamiento local
          localStorage.setItem('token', response.access_token);
          // Redirige al usuario a la página de dashboard
          this.router.navigate(['dashboard']);
        } else {
          // En caso de error, muestra un mensaje de error en el componente
          this.errorStatus = true;
          this.errorMsj = 'Credenciales incorrectas, intenta de nuevo';
        }
      },
      (error) => {
        if (error.status === 401) { //unauthorized (bad credentials)
          this.errorStatus = true;
          this.errorMsj = 'Credenciales incorrectas, intenta de nuevo.';
        } else {  // Otro tipo de error
          console.error('Error de conexión:', error);
          this.errorStatus = true;
          this.errorMsj = 'Error: Algo salió mal, intenta de nuevo Mas tarde.';
        }
      }
    );
  }
  
}
