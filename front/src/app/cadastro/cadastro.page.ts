import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/* INTEGRAÇÃO */
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  registerForm: FormGroup; //FormGroup é o nome do formulário
  public passwordError: boolean;
  public inputPhone: boolean = false;

  //Construtor do formulário
  constructor(public formbuilder: FormBuilder, public route: ActivatedRoute, public registerService: RegisterService, private router: Router) { 
      this.registerForm = this.formbuilder.group({
        name: [null, [Validators.required, Validators.minLength(3)]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        check_password: [null, [Validators.required, Validators.minLength(6)]],
        is_locator: [null, [Validators.required]],
        telephone: [null]
      });
  }

  ngOnInit() {
  }

  //Função que é chamada ao submeter o formulário e enviar dados para cadastro no back
  submitForm(form){
		this.registerService.createUser(form.value).subscribe( (res) => {
      // console.log(res); 
      // console.log(res.status);
      if(res.status == 401){
        console.log(res.error);
      }
      else if(res.status == 200){
        //console.log(res.data.success);
        let token = res.success.token;
        localStorage.setItem('token', token);
        this.router.navigate(['/home']); //redirecionamento para a home
      }
    })
  }
  
  //Verificação de senha
  checkPassword(form){
    if(form.value.password != form.value.check_password){
        this.passwordError = true;
    }
    else{
        this.passwordError = false;
    }
  }

  //Input do telefone
  setInputPhone(){
    this.inputPhone = true;
  }

  unsetInputPhone(){
    this.inputPhone = false;
  }



}
