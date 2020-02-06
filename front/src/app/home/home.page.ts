import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //ARRAY DE TESTES
  title: string;
  id: number;
  neighborhood: string;
  city: string;
  photo: string;

  //Array fixo com os títulos dos cards
  public highlightsArray: object[] = [
    { title: 'Repúblicas com avaliações excelentes' },
    { title: 'Repúblicas com os menores preços' }, 
    { title: 'Repúblicas mais comentadas'}
  ]

  //Array alimentado com dados do BD
  public excelentsArray: object[] = [
    { 
      id: 1,
      neighborhood: 'Copacabana',
      city: 'RJ',
      photo: './assets/copa.jpg',
    },
    { 
      id: 2,
      neighborhood: 'Ilha',
      city: 'RJ',
      photo: './assets/ilha.jpg',
    },
    { 
      id: 3,
      neighborhood: 'Urca',
      city: 'RJ',
      photo: './assets/urca.jpg',
    },
    { 
      id: 4,
      neighborhood: 'Botafogo',
      city: 'RJ',
      photo: './assets/bota.jpg',
    },
  ]

  constructor() {}

}
