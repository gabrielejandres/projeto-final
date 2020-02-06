import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-home',
  templateUrl: './card-home.component.html',
  styleUrls: ['./card-home.component.scss'],
})
export class CardHomeComponent implements OnInit {

  @Input() public republic = { 
      id: null,
      neighborhood: 'Carregando',
      city: 'Carregando',
      photo: 'Carregando',
    }

  constructor() { }

  ngOnInit() {}

}
