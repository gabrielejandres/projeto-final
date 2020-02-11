import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterRepublicService {

  apiURL: string = 'http://localhost:8000/api/';

  constructor(public http: HttpClient) { }

  //INSERIR UM USUÁRIO NO BD
	public createRepublic(republic: any): Observable<any>{
		return this.http.post(this.apiURL + 'registerRepublic', republic);
  }
  
  public updateRepublic(republic: any, id: number): Observable<any>{
		return this.http.put(this.apiURL + 'updateRepublic', republic);
	}
}
