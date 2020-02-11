import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public searchValue: string;
  public auth: boolean = false; //variável que indica se o usuário está ou não logado 

  constructor(private router: Router) { }

  ngOnInit() {
    //console.log(this.token);
    let token = localStorage.getItem('token');
    // console.log(token);
    if(token != 'null'){
      this.auth = true;
    }
    else{
      this.auth = false;
    }
    //console.log(this.auth);
  }

  //Pesquisar as repúblicas de acordo com o pesquisado
  public searchRepublics(){
    console.log(this.searchValue);
  }

}
