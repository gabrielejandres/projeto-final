import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public password: string = ''
  public check_password: string = ''
  public message: string = 'As senhas não correspondem'
  public name: string = ''
  public email: string = ''
  public erro: string = ''

  constructor() { }

  ngOnInit() {
  }

  public validateRegister( event: any ): void{  
    if ( this.name == '' || this.email == '' || this.password == '' || this.check_password == '')
      this.erro = 'Todos os campos são obrigatórios'
    else
      this.erro = ''
  }

}
