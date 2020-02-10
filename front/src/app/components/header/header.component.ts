import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public auth: boolean = false; //variável que indica se o usuário está ou não logado

  token = localStorage.getItem('token');

  constructor(private router: Router) { }

  ngOnInit() {
    //console.log(this.token);
    if(this.token != null){
      this.auth = true;
    }
    else{
      this.auth = false;
    }
  }

}
