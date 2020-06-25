import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; //aviso de cadastro

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
  constructor(public formbuilder: FormBuilder, public toastController: ToastController, public route: ActivatedRoute, public registerService: RegisterService, private router: Router) { 
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
  async submitForm(form){

    //Toast de erro
    const toastError = await this.toastController.create({
      message: 'Erro ao cadastrar. Tente novamente',
      duration: 2000,
      position: 'bottom',
      animated: true,
      color: 'primary'
    });

    //Toast de sucesso
    const toastSuccess = await this.toastController.create({
      message: 'Cadastro efetuado com sucesso',
      duration: 2000,
      position: 'bottom',
      animated: true,
      color: 'primary'
    });
    
		this.registerService.createUser(form.value).subscribe( (res) => {
      if(res.status == 401){
        //console.log(res.error);
        toastError.present();
      }
      else if(res.status == 200){
        //console.log(res.data.success);
        let token = res.success.token;
        localStorage.setItem('token', token);
        localStorage.setItem('id_user', res.user.id);
        localStorage.setItem('auth', 'true');
        toastSuccess.present();
        this.router.navigate(['/home', {'id_user': res.user.id}]); //redirecionamento para a home
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
