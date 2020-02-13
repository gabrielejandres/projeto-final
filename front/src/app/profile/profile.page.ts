import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular'; //contato do proprietário
import { ToastController } from '@ionic/angular'; //aviso de adição aos favoritos
import { Router } from '@angular/router';

/* INTEGRAÇÃO */
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public auth: boolean;
  public type_user: string;
  public user_name: string;
  public is_locator: boolean;
  public locator: any = { }
  public id_republic: any; //variável que armazenará o valor do id da república se o usuário for locador

  //SELECIONAR AS FAVORITAS DO BD SE O USUÁRIO FOR INQUILINO
  public favoritesArray: any = [
    { 
      id: 9,
      name: 'Carregando',
      street: 'Carregando',
      number: 16,
      neighborhood: 'Carregando',
      photo: '../../assets/default.jpg',
      triple_rooms: 2,
      double_rooms: 1,
      single_rooms: 3,
      favorite_state: true,
      evaluation: 5
    },
    { 
      id: 13,
      name: 'Carregando',
      street: 'Carregando',
      number: 16,
      neighborhood: 'Carregando',
      photo: '../../assets/default.jpg',
      triple_rooms: 2,
      double_rooms: 1,
      single_rooms: 3,
      favorite_state: true,
      evaluation: 5
    },
    { 
      id: 6,
      name: 'Carregando',
      street: 'Carregando',
      number: 16,
      neighborhood: 'Carregando',
      photo: '../../assets/default.jpg',
      triple_rooms: 2,
      double_rooms: 1,
      single_rooms: 3,
      favorite_state: true,
      evaluation: 5
    }
  ];

  //DADOS DA REPÚBLICA DO USUÁRIO SE ELE FOR LOCADOR
  public republic = { 
    id: null,
    name: 'Default',
    neighborhood: 'Default',
    street: 'Default',
    number: null,
    photo: '../../../assets/default.jpg',
    complement: null,
    hasIndividual: true,
    hasDouble: true,
    hasTriple: true,
    single_rooms: 2,
    double_rooms: 3,
    triple_rooms: null,
    single_price: 800,
    double_price: 700,
    triple_price: null,
    evaluation: 5.0,
    info: 'A República das Flores fica perto de ponto de ônibus, mercados e academia. Cerca de 15 minutos até a UFRJ, Unirio, IME',
    favorite_state: true
  };

  constructor(public alertController: AlertController, public toastController: ToastController, public router: Router, public searchService: SearchService) { }

  ngOnInit() {
    if(localStorage.getItem('token') == 'null'){
      this.auth = false;
    }
    else {
      this.auth = true;
      this.getUser();
    }
  }

  //Função que obtém qual o tipo de usuário logado e seus dados
  getUser(){
    let id_user = parseInt(localStorage.getItem('id_user'));
    this.searchService.getUser(id_user).subscribe( (res) => {
      this.user_name = res[0].name;
      this.id_republic = res[0].republic_id;
      console.log(this.id_republic);
      if(res[0].is_locator){
        this.is_locator = true;
        this.type_user = 'Locador';
        if(this.id_republic != null){
          this.searchService.getRepublic(res[0].republic_id).subscribe( (resp) => {
            let republic = resp;
            this.republic.id = republic[0].id;
            this.republic.name = republic[0].name;
            this.republic.info = republic[0].info;
            this.republic.neighborhood = republic[0].neighborhood;
            this.republic.street = republic[0].street;
            this.republic.number = republic[0].number;
            this.republic.complement = republic[0].complement;
            if(republic[0].photo != null){
              this.republic.photo = republic[0].photo;
            }
  
            if(republic[0].single_rooms == 0){
              this.republic.hasIndividual = false;
            }
            else{
              this.republic.single_rooms = republic[0].single_rooms;
              this.republic.single_price = republic[0].single_price;
            }
  
            if(republic[0].double_rooms == 0){
              this.republic.hasDouble = false;
            }
            else{
              this.republic.double_rooms = republic[0].double_rooms;
              this.republic.double_price = republic[0].double_price;
            }
  
            if(republic[0].triple_rooms == 0 || republic[0].triple_rooms == null ){
              this.republic.hasTriple = false;
            }
            else{
              this.republic.triple_rooms = republic[0].triple_rooms;
              this.republic.triple_price = republic[0].triple_price;
            }
            
            this.republic.evaluation = republic[0].evaluation;
          });
        }
      }
      else{
        this.is_locator = false;
        this.type_user = 'Locatário';
      }
    });
  }

  //Função que vai enviar id da república e receber dados do proprietário do BD
  async contact(republic: any) {
    //console.log(republic);
    //console.log(republic.id);
    this.searchService.getUserByIdRepublic(republic.id).subscribe( async (res) => {
      //console.log(res);
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
          message: '<center> Compartilhe ' + republic.name + ' com seus amigos: </center> <center> <ion-icon name="logo-facebook"></ion-icon> <ion-icon name="logo-twitter"></ion-icon> <ion-icon name="logo-instagram"></ion-icon> <ion-icon name="logo-whatsapp"></ion-icon> <ion-icon name="logo-snapchat"></ion-icon> </center>',
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
