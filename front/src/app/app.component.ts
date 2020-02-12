import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

/* INTEGRAÇÃO */
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public type_user: string; //variável que indica o tipo de usuário logado no sistema
  public is_locator: boolean = true; //TEM QUE SELECIONAR DO BD

  public appPages = [
    {
      title: 'Página inicial',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Perfil',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'Cadastrar república',
      url: '/register-republic',
      icon: 'add-circle'
    },
    {
      title: 'Editar perfil',
      url: '/edit-profile',
      icon: 'create'
    },
    {
      title: 'Sair',
      url: '/home',
      icon: 'log-out'
    },
  ];

  constructor(
    public authService: AuthService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logoutUser(){
    this.authService.logout();
    localStorage.setItem( 'token', null);
    localStorage.setItem( 'id_user', null);
    //let tok = localStorage.getItem('token');
    this.router.navigate(['/home', {'id_user': localStorage.getItem('id_user')}]);
  }
}
