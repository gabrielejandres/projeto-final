import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  apiURL: string = 'http://localhost:8000/api/';

  constructor(public http: HttpClient) { }

  //INSERIR UM USUÁRIO NO BD
	public createUser(user: any): Observable<any>{
		return this.http.post(this.apiURL + 'registerUser', user);
  }
  
  //INSERIR RELAÇÃO ENTRE REPUBLICA E USUARIO
  public addRepublicintoUser(republic: any, id: number): Observable<any>{
		return this.http.put(this.apiURL + 'addRepublicintoUser/' + id, republic);
  }
  
  //ATUALIZAR DADOS DO USUARIO NO BD
  public updateUser(user: any, id: number): Observable<any>{
		return this.http.put(this.apiURL + 'updateUser/' + id, user);
	}
}
