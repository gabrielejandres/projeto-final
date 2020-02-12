import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular'; //contato do proprietário
import { ToastController } from '@ionic/angular'; //aviso de adição aos favoritos
// import { Router } from '@angular/router'; FUNÇÃO ROTA COMENTADA

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  isnt_locator:boolean = null;

  constructor() { }

  public user_state(){
    if (this.is_locator){
      this.isnt_locator = false;
    }
    else{
      this.isnt_locator = true;
      this.is_locator = false;
    }
  }

  

  ngOnInit() {
  }

}
