import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular'; //contato do proprietário
import { ToastController } from '@ionic/angular'; //aviso de adição aos favoritos
import { Router } from '@angular/router';

/* INTEGRAÇÃO */
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-card-catalog',
  templateUrl: './card-catalog.component.html',
  styleUrls: ['./card-catalog.component.scss'],
})
export class CardCatalogComponent implements OnInit {

  //Objeto locator simulando dados vindos do BD
  public locator: any = {
      id: 1,
      name: 'Glória Maria',
      email: 'gloria@gmail.com',
      phone: '(21) 999858416'
  }

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

  constructor(public alertController: AlertController, public toastController: ToastController, public router: Router, public searchService: SearchService) { }

  ngOnInit() {}

  //Função que vai enviar id da república e receber dados do proprietário do BD
  async contact(republic: any) {
    const alert = await this.alertController.create({
      header: 'Contato do proprietário',
      subHeader: this.locator.name,
      message: '☎ Telefone: ' + this.locator.phone + ' <br/> ✉ E-mail: ' + this.locator.email,
      cssClass: 'alert',
      animated: true,
      backdropDismiss: true,
      keyboardClose: true,
    });
  
    await alert.present();
    }

  //Função de adicionar aos favoritos
  async favorite(republic: any) {
    republic.favorite_state = !republic.favorite_state;
    if(republic.favorite_state){
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
      toast.present();
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
      toast.present();
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
    //console.log(idRepublic);
    this.searchService.getRepublic(idRepublic).subscribe( (res) => {
      //console.log(res);
      let republic = JSON.stringify(res);
      localStorage.setItem('republic', republic);
      this.router.navigate(['/republic', {'id_republic': idRepublic}]);
    })
  	//this.router.navigate(['/republic']);
  }

}
