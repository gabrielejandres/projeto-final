import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

/* INTEGRAÇÃO */
import { SearchService } from '../../services/search.service';

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
    };

  constructor(public router: Router, public searchService: SearchService) { }

  ngOnInit() {}

  //Redirecionamento para a página da república
  public route_republic(idRepublic: number){
    this.searchService.getRepublic(idRepublic).subscribe( (res) => {
      let republic = JSON.stringify(res);
      localStorage.setItem('republic', republic);
      this.router.navigate(['/republic', {'id_republic': idRepublic}]);
    })
  }

}
