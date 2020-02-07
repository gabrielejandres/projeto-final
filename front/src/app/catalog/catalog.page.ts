import { Component, OnInit } from '@angular/core';
// import { Router} from '@angular/router'; FUNÇÃO ROTA COMENTADA

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {

  // private router:Router FUNÇÃO ROTA PARA O CONSTRUCTOR
  constructor() { }

  favor_state:number = null;

  numeros:any [] = [1,2,3,4,5]; // lista com numero de estrelas

  public favor():void{ 
    if(this.favor_state == null){
      this.favor_state = 1;
    }
    else{
      this.favor_state = null;
    }
  }

  // route_republic(){
  // 	this.router.navigate(['/republic']); Direcionamento provisório para a página republic
  // }


  ngOnInit() {
  }

}
