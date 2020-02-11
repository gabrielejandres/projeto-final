import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

/* INTEGRAÇÃO */
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(public formbuilder: FormBuilder, private storage: Storage, public authService: AuthService, private router: Router) { 
      this.loginForm = this.formbuilder.group({
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]]
      });
  }

  ngOnInit() {
  }

  //ENVIAR DADOS PARA LOGIN NO BACK
  submitForm(form){
    //this.storage.set('email', form.value.email);
    if(form.status == 'VALID'){
      this.authService.loginUser(form.value).subscribe( 
        (res) => {
          if(res.status == 200){
            //console.log(res.success.token);
            localStorage.setItem('token', res.success.token);
            //console.log("pós setItem", localStorage.getItem('token'))
            this.router.navigate(['/home', {'token': res.success.token}]);
          }
          else if(res.status == 401){
            alert('Dados inválidos');
          }
        }
      );
    }
  }

  //Pegar informações armazenadas no storage
  // getInfo(){
  //     this.storage.get('email').then((val) => {
  //     console.log('E-mail: ', val);
  //     });
  // }

}
