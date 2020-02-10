import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public type_user: string; //variável que indica o tipo de usuário logado no sistema
  public is_locator: boolean = true;

  public appPages = [
    {
      title: 'Página inicial',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Editar perfil',
      url: '/edit-profile',
      icon: 'create'
    },
    {
      title: 'Cadastrar república',
      url: '/register-republic',
      icon: 'add-circle'
    },
    {
      title: 'Favoritas',
      url: '/favorites',
      icon: 'star'
    },
    {
      title: 'Sair',
      url: '/logout',
      icon: 'log-out'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
