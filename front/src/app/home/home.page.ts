import { Component } from '@angular/core';

/* INTEGRAÇÃO */
import { SearchService } from '../services/search.service';

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
  public cont: number = 0;

  //Array fixo com os títulos dos cards
  public highlightsArray: object[] = [
    { title: 'Repúblicas com avaliações excelentes' },
    { title: 'Melhores opções de quartos individuais' }, 
    { title: 'Melhores opções de quartos duplos'},
    { title: 'Melhores opções de quartos triplos'}
  ]

  
  //Array alimentado com dados do BD
  public excelentsArray = [];
  public lowerTripleArray = [];
  public lowerDoubleArray = [];
  public lowerSingleArray = [];

  constructor( public searchService: SearchService) {}

  ngOnInit(){
    let tok = localStorage.getItem('token');

    //Chamada das funções que carregam os dados do BD
    this.bestEvaluation();
    this.lowerPricesSingle();
    this.lowerPricesDouble();
    this.lowerPricesTriple();

  }

  /*LISTAS DA PÁGINA PRINCIPAL*/

  //Menores preços - triplo
  lowerPricesTriple(){
    this.searchService.getRepublicsByPriceTriple().subscribe( (res) => {
      this.lowerTripleArray = res;
    });
  }

  //Menores preços - duplo
  lowerPricesDouble(){
    this.searchService.getRepublicsByPriceDouble().subscribe( (res) => {
      this.lowerDoubleArray = res;
    });
  }

  //Menores preços - individual
  lowerPricesSingle(){
    this.searchService.getRepublicsByPriceSingle().subscribe( (res) => {
      this.lowerSingleArray = res;
    });
  }

  //Melhores avaliações
  bestEvaluation(){
    this.searchService.getRepublicsByBestEvaluation().subscribe( (res) => {
      this.excelentsArray = res;
    });
  }

}
