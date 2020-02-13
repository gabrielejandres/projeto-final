import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular'; //contato do proprietário
import { ToastController } from '@ionic/angular'; //aviso de adição aos favoritos
import { Location } from '@angular/common';

/* INTEGRAÇÃO */
import { SearchService } from '../services/search.service';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-republic',
  templateUrl: './republic.page.html',
  styleUrls: ['./republic.page.scss'],
})
export class RepublicPage implements OnInit {

  commentForm: FormGroup;
  public auth: boolean; //variável que indica se o usuário está ou não logado
  formComment: boolean = false;
  public userName: string; //variável que armazena o nome do usuário logado no sistema

  //Array da república selecionada do BD
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
      favorite_state: false
    };

  
  comments: any = [  
    { user: 'Carregando',
      evaluation: 5,
      content: 'Adorei a casa muito legal',
      date: '4 minutos atrás'
    }
  ]

  constructor(public formbuilder: FormBuilder, public commentService: CommentService, public location: Location, public searchService: SearchService, public alertController: AlertController, public toastController: ToastController) { 
    this.commentForm = this.formbuilder.group({
      content: [null, [Validators.required]],
      evaluation: [null]
    });
  }

  public comment(): any{
    this.formComment = !this.formComment;
  }

  //Submeter o comentário
  async submitForm(form){
    const toast = await this.toastController.create({
        message: '<center> Comentário enviado com sucesso </center>',
        duration: 2000,
        position: 'bottom',
        animated: true,
        color: 'success',
        keyboardClose: true,
    });
    let id_republic = localStorage.getItem('id_republic');
    let id_user = localStorage.getItem('id_user');
    this.commentService.addRepublicUserintoComment(form.value, id_republic, id_user).subscribe( (res) => {
      if(res[0] == 'Efetuado com sucesso!'){
        this.formComment = !this.formComment;
        toast.present();
      }
    })
  }

  //Obter o usuário logado no sistema
  public getUser(){
    let user_id = parseInt(localStorage.getItem('id_user'));
    this.searchService.getUser(user_id).subscribe( (res) => {
      this.userName = res[0].name;
    })
  }

  //Gerar o array de comentários - ESPERAR A FUNÇÃO DO BACK
  /*public getComments(comments: any){
    //obter usuário logado no sistema
    this.getUser();

    //COLOCAR A PARADA DA SERVICE AQUI
    comments.forEach(element => {
      this.comments.user = this.userName;
      this.comments.content = element.content;
      this.comments.evaluation = element.evaluation;
      this.comments.date = element.date;
    });
  }*/

  public goBack(){
    this.location.back();
  }

  ngOnInit() {
    let republic = JSON.parse(localStorage.getItem('republic'));
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
    this.republic.favorite_state = false; //SELECIONAR DO BD E SABER SE ESTÁ FAVORITADA

    /* AUTENTICAÇÃO */
    if(localStorage.getItem('token') == 'null'){
      this.auth = false;
    }
    else{
      this.auth = true;
      //this.getComments();
    }
  }

}