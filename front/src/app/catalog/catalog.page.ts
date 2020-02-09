import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'; 

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {

  constructor(private router:Router ) { }
  currentUrl = this.router.url;

  //Array alimentado com dados do BD
  public republicsArray: object[] = [
    { 
      id: 1,
      name: 'República das Flores',
      street: 'Rua Marcos Mioto',
      number: 16,
      neighborhood: 'Copacabana',
      photo: './assets/copa.jpg',
      triple_rooms: 2,
      double_rooms: 2,
      individual_rooms: 2,
      favorite_state: false,
      evaluation: 5
    },
    { 
      id: 2,
      name: 'República dos Cantos',
      street: 'Rua Marcos Mioto',
      number: 16,
      neighborhood: 'Ilha',
      photo: './assets/ilha.jpg',
      triple_rooms: 2,
      double_rooms: 2,
      individual_rooms: 2,
      favorite_state: false,
      evaluation: 4
    },
    { 
      id: 3,
      name: 'República do Riacho',
      street: 'Rua Marcos Mioto',
      number: 16,
      neighborhood: 'Urca',
      photo: './assets/urca.jpg',
      triple_rooms: 2,
      double_rooms: 2,
      individual_rooms: 2,
      favorite_state: false,
      evaluation: 4
    },
    { 
      id: 4,
      name: 'República da Glória',
      street: 'Rua Marcos Mioto',
      number: 16,
      neighborhood: 'Botafogo',
      photo: './assets/bota.jpg',
      triple_rooms: 2,
      double_rooms: 2,
      individual_rooms: 2,
      favorite_state: false,
      evaluation: 3.5
    },
  ]

  ngOnInit() {
  }

}