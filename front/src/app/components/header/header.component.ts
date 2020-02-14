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
    if(search == "repúblicas" || search == undefined || search == "rj"){
      this.searchService.getRepublics().subscribe( (res) => {
        //console.log(res);
        if(res.republics.length == 0){
          toastError.present();
        }
        else if(res.status == 200){
          let republics = JSON.stringify(res.republics);
          // console.log(republics);
          localStorage.setItem('republics', republics);
          this.router.navigate(['/catalog', {'check': 1}]);
        }
      })
    }
    else{
      this.searchService.getRepublicsByNeighborhood(search).subscribe( (res) => {
        if(res.republics.length == 0){
          toastError.present();
        }
        else if(res.status == 200){
          let republics = JSON.stringify(res.republics);
          localStorage.setItem('republics', republics);
          this.router.navigate(['/catalog', {'check': 1}]);
        }
      })
    }
  }

  //Dar reload na página
  reload(){
    if(localStorage.getItem('cont') == '0'){
      localStorage.setItem('cont', '1');
      location.reload();
    }
  }

}
