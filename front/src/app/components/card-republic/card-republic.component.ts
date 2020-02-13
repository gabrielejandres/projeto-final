import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular'; //contato do proprietário
import { ToastController } from '@ionic/angular'; //aviso de adição aos favoritos
import { Router} from '@angular/router'; 
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-card-republic',
  templateUrl: './card-republic.component.html',
  styleUrls: ['./card-republic.component.scss'],
})
export class CardRepublicComponent implements OnInit {

  public auth: boolean;

  //Objeto locator simulando dados vindos do BD
  public locator: any = {}

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
      single_rooms: null,
      double_rooms: null,
      triple_rooms: null,
      single_price: null,
      double_price: null,
      triple_price: null,
      evaluation: null,
      info: 'Carregando',
      favorite_state: null
    };
  
  constructor(public alertController: AlertController, public searchService: SearchService, public toastController: ToastController, private router: Router) { }

  //Função que vai enviar id da república e receber dados do proprietário do BD
  async contact(republic: any) {
    if(this.auth == true){
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

            await alert.present(); 
        })
      }
      else{
        this.router.navigate(['/login']);
      }
    }

  //Função de adicionar aos favoritos
  async favorite(republic: any) {
    if(this.auth == true){
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
    else{
      this.router.navigate(['/login']);
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

  ngOnInit() {
    if(localStorage.getItem('token') == 'null'){
      this.auth = false;
    }
    else this.auth = true;
  }

}
