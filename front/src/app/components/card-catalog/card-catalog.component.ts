import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular'; //contato do proprietário
import { ToastController } from '@ionic/angular'; //aviso de adição aos favoritos
import { Router } from '@angular/router';

/* INTEGRAÇÃO */
import { SearchService } from '../../services/search.service';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-card-catalog',
  templateUrl: './card-catalog.component.html',
  styleUrls: ['./card-catalog.component.scss'],
})
export class CardCatalogComponent implements OnInit {

  public auth: boolean;

  public locator: any = { }

  @Input() public republic: any = { 
      id: null,
      name: 'Carregando',
      street: 'Carregando',
      number: null,
      neighborhood: 'Carregando',
      photo: 'Carregando',
      triple_rooms: null,
      double_rooms: null,
      single_rooms: null,
      favorite_state: null,
      evaluation: null
    };

  constructor(public alertController: AlertController, public toastController: ToastController, public router: Router, public searchService: SearchService, public favoriteService: FavoriteService) { }

  ngOnInit() {
    if(localStorage.getItem('token') == 'null'){
      this.auth = false;
    }
    else this.auth = true;
  }

  //Função que vai enviar id da república e receber dados do proprietário do BD
  async contact(republic: any) {
    this.searchService.getUserByIdRepublic(republic.id).subscribe( async (res) => {
      this.locator.id = res.user[0].id;
      this.locator.name = res.user[0].name;
      this.locator.email = res.user[0].email;
      this.locator.phone = res.user[0].telephone;

      const alert = await this.alertController.create({
        header: 'Contato do proprietário',
        subHeader: this.locator.name,
        message: '☎ Telefone: ' + this.locator.phone + ' <br/> ✉ E-mail: ' + this.locator.email,
        cssClass: 'alert',
        animated: true,
        backdropDismiss: true,
        keyboardClose: true,
      });

      if(this.auth == true){
        await alert.present(); 
      }
      else{
        this.router.navigate(['/login']);
      }
    })
  }

  //Função de adicionar aos favoritos
  async favorite(republic: any) {
    republic.favorite_state = !republic.favorite_state;
    if(republic.favorite_state){
      //Toast de adição aos favoritos
      const toast = await this.toastController.create({
        message: 'República adicionada na sua lista! :)',
        duration: 2000,
        position: 'bottom',
        animated: true,
        color: 'primary',
        keyboardClose: true,
        showCloseButton: true,
        closeButtonText: ' X '
      });
      let user_id = localStorage.getItem('id_user');
      this.favoriteService.createFavorite(republic.id, user_id).subscribe( async (res) => {
        toast.present();
      });
      
    }
    else{
      const toast = await this.toastController.create({
        message: 'República removida da sua lista! :(',
        duration: 2000,
        position: 'bottom',
        animated: true,
        color: 'primary',
        keyboardClose: true,
        showCloseButton: true,
        closeButtonText: ' X '
      });
      
      let user_id = localStorage.getItem('id_user');
      this.favoriteService.createFavorite(republic.id, user_id).subscribe( async (res) => {
        toast.present();
      });
    }
  }

  //Compartilhar
    async share(republic: any) {
        const toast = await this.toastController.create({
          message: '<center> Compartilhe ' + this.republic.name + ' com seus amigos: </center> <center> <ion-icon name="logo-facebook"></ion-icon> <ion-icon name="logo-twitter"></ion-icon> <ion-icon name="logo-instagram"></ion-icon> <ion-icon name="logo-whatsapp"></ion-icon> <ion-icon name="logo-snapchat"></ion-icon> </center>',
          duration: 3000,
          position: 'bottom',
          animated: true,
          color: 'primary',
          keyboardClose: true,
        });
        toast.present();
    }

  //Redirecionamento para a página da república
  public route_republic(idRepublic: number){
    this.searchService.getRepublic(idRepublic).subscribe( (res) => {
      let republic = JSON.stringify(res);
      localStorage.setItem('republic', republic);
      this.router.navigate(['/republic', {'id_republic': idRepublic}]);
    })
  }

}
