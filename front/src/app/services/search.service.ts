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
  // getRepublics():Observable<any>{
	// 	return this.http.get(this.apiURL + 'listRepublics/');
	// }

  //Lista os dados da república por id
	getRepublic(id:number):Observable<any>{
		return this.http.get(this.apiURL + 'listRepublic/' + id);
  }

  //Lista as repúblicas com os menores preços
	getRepublicsByPrice():Observable<any>{
		return this.http.get(this.apiURL + 'searchPrice/');
  }
  

}
