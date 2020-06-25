import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

/* INTEGRAÇÃO */
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(public formbuilder: FormBuilder, public alertController: AlertController, private storage: Storage, public authService: AuthService, private router: Router) { 
      this.loginForm = this.formbuilder.group({
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]]
      });
  }

  ngOnInit() {
  }

  //ENVIAR DADOS PARA LOGIN NO BACK
  async submitForm(form){
    if(form.status == 'VALID'){
      const alert = await this.alertController.create({
        header: 'Dados inválidos!',
        message: 'Confira seus dados e tente novamente',
        cssClass: 'alert',
        animated: true,
        backdropDismiss: true,
        keyboardClose: true,
      });
      this.authService.loginUser(form.value).subscribe( 
        (res) => {
          if(res.status == 200){
            localStorage.setItem('token', res.success.token);
            localStorage.setItem('id_user', res.user.id);
            localStorage.setItem('cont', '0');
            this.router.navigate(['/home', {'id_user': res.user.id}]); 
          }
          else if(res.status == 401){
              alert.present();
          }
        }
      );
    }
  }
}
