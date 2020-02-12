import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; //aviso de adição aos favoritos

/* INTEGRAÇÃO */
import { RegisterRepublicService } from '../services/register-republic.service';

@Component({
  selector: 'app-register-address',
  templateUrl: './register-address.page.html',
  styleUrls: ['./register-address.page.scss'],
})
export class RegisterAddressPage implements OnInit {

  addressForm: FormGroup;

    //Construtor do formulário
    constructor(public formbuilder: FormBuilder, private router: Router, public registerRepublicService: RegisterRepublicService, public toastController: ToastController ) { 
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
    //console.log(form);
    //console.log(form.value); 
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
      console.log(res); 
      console.log(res.status);
      if(res.status == 401){
        //alert('Dados inválidos');
        toastError.present();
        //console.log(res.error);
      }
      else if(res.status == 200){
        //console.log(res.success);
        toastSuccess.present();
        this.router.navigate(['/home']);
      }
    })
  }

}
