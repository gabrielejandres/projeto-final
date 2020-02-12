import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

/* INTEGRAÇÃO */
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public searchValue: string;
  public auth: boolean = false; //variável que indica se o usuário está ou não logado 

  constructor(private router: Router, public searchService: SearchService, public toastController: ToastController) { }

  ngOnInit() {
    let token = localStorage.getItem('token');
    // console.log(token);
    if(token != 'null'){
      this.auth = true;
      localStorage.setItem('auth', 'true');
    }
    else{
      this.auth = false;
      localStorage.setItem('auth', 'false');
    }
  }

  //Pesquisar as repúblicas de acordo com o bairro pesquisado
  async searchRepublics(){
    console.log(localStorage.getItem('republics'));
    //Toast de aviso de erro
    const toastError = await this.toastController.create({
      message: 'Não existem repúblicas cadastradas nesse bairro :(',
      duration: 3500,
      position: 'bottom',
      animated: true,
      color: 'primary',
      keyboardClose: true
    });
    let search = this.searchValue;
    console.log(search);
    this.searchService.getRepublicsByNeighborhood(search).subscribe( (res) => {
      //console.log(res);
      if(res.republics.length == 0){
        toastError.present();
      }
      else if(res.status == 200){
        //console.log(res.republics);
        // console.log(res.republics.length);
        let republics = JSON.stringify(res.republics);
        // console.log(republics);
        localStorage.setItem('republics', republics);
        this.router.navigate(['/catalog', {'check': 1}]);
      }
    })
  }

}
