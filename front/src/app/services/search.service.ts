import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  apiURL: string = 'http://localhost:8000/api/';

  constructor(public http: HttpClient) { }

  //Lista as repúblicas de um bairro
	getRepublicsByNeighborhood(neighborhood: string):Observable<any>{
		return this.http.get(this.apiURL + 'searchNeighborhood/' + neighborhood);
  }

  //Listar todas as repúblicas do BD - FAZER A FUNÇÃO NO BACK
  getRepublics():Observable<any>{
		return this.http.get(this.apiURL + 'listallRepublic');
	}

  //Lista os dados da república por id
	getRepublic(id:number):Observable<any>{
		return this.http.get(this.apiURL + 'listRepublic/' + id);
  }

  //Lista as repúblicas com os menores preços - triplo
	getRepublicsByPriceTriple():Observable<any>{
		return this.http.get(this.apiURL + 'searchPriceTriple');
  }

  //Lista as repúblicas com os menores preços - duplo
	getRepublicsByPriceDouble():Observable<any>{
		return this.http.get(this.apiURL + 'searchPriceDouble');
  }

  //Lista as repúblicas com os menores preços - individual
	getRepublicsByPriceSingle():Observable<any>{
		return this.http.get(this.apiURL + 'searchPriceSingle');
  }

  //Lista as repúblicas com as melhores avaliações
	getRepublicsByBestEvaluation():Observable<any>{
		return this.http.get(this.apiURL + 'searchBestEvaluation');
  }

  //Lista o usuário que tem um id
  getUser(id:number):Observable<any>{
		return this.http.get(this.apiURL + 'listUser/' + id);
  }

  //Lista o usuário que está relacionado com uma república
  getUserByIdRepublic(republic_id:number):Observable<any>{
		return this.http.get(this.apiURL + 'listUserByIdRepublic/' + republic_id);
  }

}
