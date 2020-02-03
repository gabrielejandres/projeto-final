import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public password: string = ''
  public check_password: string = ''
  public message: string = ''
  public have_message: boolean = false

  constructor() { }

  ngOnInit() {
  }

  validatePassword( event: any ): void{  
    if (this.password != this.check_password){
      this.message = 'As senhas não correspondem'
      this.have_message = true
    }
    else{
      this.have_message = !this.have_message
    }
      
  }

}
