import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterRepublicService {

  apiURL: string = 'http://localhost:8000/api/';

  httpHeaders: any = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  constructor(public http: HttpClient) { }

  //INSERIR UMA REPÚBLICA NO BD
	public createRepublic(republic: any): Observable<any>{
		return this.http.post(this.apiURL + 'registerRepublic', republic);
  }
  
  //ATUALIZAR DADOS DA REPUBLICA NO BD
  public updateRepublic(republic: any, id: number): Observable<any>{
		return this.http.put(this.apiURL + 'updateRepublic/' + id, republic);
  }
  
  //DELETAR UMA REPÚBLICA DO BD
  public deleteRepublic(id_republic: any): Observable<any>{
    this.httpHeaders.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    return this.http.delete(this.apiURL + 'deleteRepublic/' + id_republic, this.httpHeaders);
  }
}
