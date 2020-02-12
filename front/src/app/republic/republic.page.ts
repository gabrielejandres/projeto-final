import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular'; //contato do proprietário
import { ToastController } from '@ionic/angular'; //aviso de adição aos favoritos
// import { Router } from '@angular/router'; FUNÇÃO ROTA COMENTADA

@Component({
  selector: 'app-republic',
  templateUrl: './republic.page.html',
  styleUrls: ['./republic.page.scss'],
})
export class RepublicPage implements OnInit {

  commentForm: FormGroup;
  public auth: boolean = true; //variável que indica se o usuário está ou não logado
  formComment: boolean = false;
  public userName = 'Fulano de Tal'; //variável que armazena o nome do usuário logado no sistema

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

  // Lista de comentários que vai ser gerada com sql: select * from comments where id_republic == idRepublic
  comments: any = [  
    {user : 'Joao Silva',
    comment : 'Muito boa, meus cachorros adoraram a casa',
    evaluation: 5
    },
    {user : 'Maria Silva',
    comment : 'Só tinha problema com os cachorros do Joao',
    evaluation: 4
    },
    {user : 'Adalberto Silva',
    comment : 'Show de bola!',
    evaluation: 4.5
    },
    {user : 'Lurdes Silva',
    comment : 'Deu pra dormir',
    evaluation: 2.5
    },
    {user : 'Bia Silva',
    comment : 'Não achei nada demais',
    evaluation: 3
    },
    {user : 'Alvaro Silva',
    comment : 'Gostei da decoração',
    evaluation: 4
    }
  ]

  constructor(public formbuilder: FormBuilder, public alertController: AlertController, public toastController: ToastController) { 
    this.commentForm = this.formbuilder.group({
      comment: [null, [Validators.required]],
      evaluation: [null]
    });
  }

  public comment(): any{
    this.formComment = !this.formComment;
  }

  //Submeter o comentário
  async submitForm(form){
    //console.log(form.value);
    let comment = {
      user: this.userName,
      comment: form.value.comment,
      evaluation: form.value.evaluation
    }
    this.comments.unshift(comment); //adiciona o comentário no array
    this.formComment = !this.formComment;
    const toast = await this.toastController.create({
      message: '<center> Comentário enviado com sucesso </center>',
      duration: 2000,
      position: 'bottom',
      animated: true,
      color: 'success',
      keyboardClose: true,
    });
    toast.present();
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
    else this.auth = true;
  }

}