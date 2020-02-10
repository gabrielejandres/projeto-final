import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(public formbuilder: FormBuilder, private storage: Storage) { 
      this.loginForm = this.formbuilder.group({
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]]
      });
  }

  ngOnInit() {
  }

  //ENVIAR DADOS PARA LOGIN NO BACK
  submitForm(form){
    this.storage.set('email', form.value.email);
    //console.log(form);
    console.log(form.value); 
  }

  //Pegar informações armazenadas no storage
  getInfo(){
      this.storage.get('email').then((val) => {
      console.log('E-mail: ', val);
      });
  }

}
