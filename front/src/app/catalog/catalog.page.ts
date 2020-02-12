import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'; 
import { ToastController } from '@ionic/angular';

/* INTEGRAÇÃO */
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {

  constructor(private router:Router, public searchService: SearchService, public toastController: ToastController ) { }
  public searchValue: string;
  currentUrl = this.router.url;
  public auth: boolean = true; //variável que indica se o usuário está ou não logado

  //Array alimentado com dados do BD
  public republicsArray: object[] = []

  ngOnInit() {
    if(localStorage.getItem('token') == null){
      this.auth = false;
    }
    else this.auth = true;
    let republics = JSON.parse(localStorage.getItem('republics'));
    republics.forEach(element => {
      this.republicsArray.push(element);
    });
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
    else{
      this.searchService.getRepublicsByNeighborhood(search).subscribe( (res) => {
        if(res.republics.length == 0){
          toastError.present();
        }
        else if(res.status == 200){
          let republics = JSON.stringify(res.republics);
          localStorage.setItem('republics', republics);
          this.router.navigate(['/catalog', {'check': 0}]);
        }
      })
    }
  }

}