import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router'; FUNÇÃO ROTA COMENTADA

@Component({
  selector: 'app-republic',
  templateUrl: './republic.page.html',
  styleUrls: ['./republic.page.scss'],
})
export class RepublicPage implements OnInit {

  replys;

  constructor() {
    this.replys = [  // Lista reply para testar comentários
      {reply_nome : 'Joao',
      reply_texto : 'Muito boa, meus cachorros adoraram a casa',
      },
      {reply_nome : 'Maria',
      reply_texto : 'Só tinha problema com os cachorros do Joao',
      },
      {reply_nome : 'Adalberto',
      reply_texto : 'Show de bola!',
      },
      {reply_nome : 'Lurdes',
      reply_texto : 'Deu pra dormir',
      },
      {reply_nome : 'Bia',
      reply_texto : 'Não achei nada demais',
      },
      {reply_nome : 'Alvaro',
      reply_texto : 'Gostei da decoração',
      }
    ]
   }

  favor_state:number = null;

  numeros:any [] = [1,2,3,4,5];

  public favor():void{
    if(this.favor_state == null){
      this.favor_state = 1;
    }
    else{
      this.favor_state = null;
    }
  }

  ngOnInit() {
  }

}
