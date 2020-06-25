import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

/* INTEGRAÇÃO */
import { RegisterRepublicService } from '../services/register-republic.service';
import { RegisterService } from '../services/register.service'; //para inserir relação entre usuário e república

@Component({
  selector: 'app-register-address',
  templateUrl: './register-address.page.html',
  styleUrls: ['./register-address.page.scss'],
})
export class RegisterAddressPage implements OnInit {

  addressForm: FormGroup;

    //Construtor do formulário
    constructor(public formbuilder: FormBuilder, private router: Router, public registerService: RegisterService, public registerRepublicService: RegisterRepublicService, public toastController: ToastController ) { 
      this.addressForm = this.formbuilder.group({
        street: [null, [Validators.required]],
        neighborhood: [null, [Validators.required]],
        number: [null, [Validators.required]],
        complement: [null],
      });
  }

  ngOnInit() {
  }

  //Função disparada quando o form é enviado
  async submitForm(form){
    //Toast de aviso de erro
    const toastError = await this.toastController.create({
      message: 'Dados inválidos. Tente novamente',
      duration: 2000,
      position: 'bottom',
      animated: true,
      color: 'primary',
      keyboardClose: true
    });
    //Toast de aviso de sucesso
    const toastSuccess = await this.toastController.create({
      message: 'Republica cadastrada com sucesso',
      duration: 2000,
      position: 'bottom',
      animated: true,
      color: 'primary',
      keyboardClose: true
    });
    let idString = localStorage.getItem('id_republic');
    let id = parseInt(idString, 10);
    this.registerRepublicService.updateRepublic(form.value, id).subscribe( (res) => {
      if(res.status == 401){
        toastError.present();
      }
      else if(res.status == 200){
        let id_user = parseInt(localStorage.getItem('id_user'));
        let republic = {republic_id: parseInt(localStorage.getItem('id_republic')) }
        this.registerService.addRepublicintoUser(republic, id_user).subscribe( (res) => {
          toastSuccess.present();
          //console.log(res);
        });
        this.router.navigate(['/home']);
      }
    })
  }

}
