import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  apiURL: string = 'http://localhost:8000/api/';

  constructor(public http: HttpClient) { }

  //CRIAR UMA RELAÇÃO DE FAVORITOS
	public createFavorite(id_republic: any, id_user: any): Observable<any>{
    return this.http.post(this.apiURL + 'createFavorite/' + id_republic + '/' + id_user, {republic_id: id_republic, user_id: id_user});
  }

  //REMOVER UMA RELAÇÃO DE FAVORITOS
	public deleteFavorite(id_user: any, id_republic: any): Observable<any>{
    return this.http.delete(this.apiURL + 'deleteFavorite/' + id_user + '/' + id_republic);
  }

  //LISTAR OS FAVORITOS
	public getFavorites(id_user: any): Observable<any>{
    return this.http.get(this.apiURL + 'ListRepublicFavorite/' + id_user);
  }

}
