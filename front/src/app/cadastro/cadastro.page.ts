import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  registerForm: FormGroup; //FormGroup é o nome do formulário
  public passwordError: boolean;

  //Construtor do formulário
  constructor(public formbuilder: FormBuilder) { 
      this.registerForm = this.formbuilder.group({
        name: [null, [Validators.required, Validators.minLength(3)]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        check_password: [null, [Validators.required, Validators.minLength(6)]],
        type_user: [null, [Validators.required]]
      });
  }

  ngOnInit() {
  }

  //Função que é chamada ao submeter o formulário e enviar dados para cadastro no back
  submitForm(form){
    console.log(form);
    console.log(form.value); //mostra os valores dos campos do form
  }

  checkPassword(form){
    if(form.value.password != form.value.check_password){
        this.passwordError = true;
    }
    else{
        this.passwordError = false;
    }
  }

}
