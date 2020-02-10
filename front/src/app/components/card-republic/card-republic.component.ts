import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular'; //contato do proprietário
import { ToastController } from '@ionic/angular'; //aviso de adição aos favoritos

@Component({
  selector: 'app-card-republic',
  templateUrl: './card-republic.component.html',
  styleUrls: ['./card-republic.component.scss'],
})
export class CardRepublicComponent implements OnInit {

  //Objeto locator simulando dados vindos do BD
  public locator: any = {
    id: 1,
    name: 'Glória Maria',
    email: 'gloria@gmail.com',
    phone: '(21) 999858416'
  }

    //Array da república selecionada do BD
    @Input() public republic = { 
      id: null,
      name: 'Carregando',
      neighborhood: 'Carregando',
      street: 'Carregando',
      number: null,
      photo: 'Carregando',
      complement: null,
      hasIndividual: null,
      hasDouble: null,
      hasTriple: null,
      qt_individual: null,
      qt_double: null,
      qt_triple: null,
      price_individual: null,
      price_double: null,
      price_triple: null,
      evaluation: null,
      add_info: 'Carregando',
      favorite_state: null
    };
  
  constructor(public alertController: AlertController, public toastController: ToastController) { }

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

  ngOnInit() {}

}
