import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router'; 

/* INTEGRAÇÃO */
import { RegisterService } from '../services/register.service'; 

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  editForm: FormGroup;
  is_locator: boolean = true;

    constructor(public formbuilder: FormBuilder, public router: Router, public registerService: RegisterService, public toastController: ToastController) { 
      this.editForm = this.formbuilder.group({
        name: [null, [Validators.minLength(3)]],
        email: [null, [Validators.email]],
        password: [null, [Validators.minLength(6)]],
        phone: [null]
      });
  }

  ngOnInit() {
  }

  //Função que é chamada ao submeter o formulário e enviar dados para edição no back
  async submitForm(form){
    //Toast de erro
    const toastError = await this.toastController.create({
      message: 'Erro ao alterar dados. Tente novamente',
      duration: 2000,
      position: 'bottom',
      animated: true,
      color: 'primary'
    });

    //Toast de sucesso
    const toastSuccess = await this.toastController.create({
      message: 'Alteração efetuada com sucesso',
      duration: 2000,
      position: 'bottom',
      animated: true,
      color: 'primary'
    });
    
    let id_user = parseInt(localStorage.getItem('id_user'));
		this.registerService.updateUser(form.value, id_user).subscribe( (res) => {
      if(res.status == 401){
        //console.log(res.error);
        toastError.present();
      }
      else if(res.status == 200){
        toastSuccess.present();
        this.router.navigate(['/home', {'id_user': res.user.id}]); //redirecionamento para a home
      }
    })
  }

}
