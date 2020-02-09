import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public auth: boolean = true; //variável que indica se o usuário está ou não logado

  constructor(private router: Router) { }

  ngOnInit() {
    
  }

}
