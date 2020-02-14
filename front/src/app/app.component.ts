import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

/* INTEGRAÇÃO */
import { AuthService } from './services/auth.service';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public is_locator: boolean = false; 
  public first: boolean = true;

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
    public router: Router,
    public searchService: SearchService
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
    this.router.navigate(['/home', {'id_user': 'none'}]);
    location.reload();
  }

  getStatus(){
    let id_user = parseInt(localStorage.getItem('id_user'));
    //console.log(id_user);
    this.searchService.getUser(id_user).subscribe( (res) => {
        if(res[0].is_locator){
          this.is_locator = true;
          let is_locator: string;
          localStorage.setItem('is_locator', 'true');
        }
        else{
          this.is_locator = false;
          localStorage.setItem('is_locator', 'false');
        }
    });
  }

  ngOnInit() {
    
    if(localStorage.getItem('token') != 'null'){
      this.getStatus();
    }
  }
}
