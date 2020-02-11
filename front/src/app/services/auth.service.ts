import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // A URL da API
  apiUrl: string = "http://localhost:8000/api/";

  httpHeaders: any = {
    headers: {
      'Content-Type': 'application/json'
      //'Accept': 'application/json'
    }
  }

  constructor( public http: HttpClient, public authService: AuthService ) { }

  // Login de usuário
  loginUser( form ): Observable<any> {
    return this.http.post( this.apiUrl + 'loginUser', form, this.httpHeaders );
  }

  //Logout de usuário
  logout(){
   // console.log(localStorage.token);
    this.httpHeaders.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    //console.log(this.httpHeaders.headers['Authorization']);
    //console.log(this.apiUrl + 'logout', this.httpHeaders);
    return this.http.post( this.apiUrl + 'logout', this.httpHeaders );
  }
}
