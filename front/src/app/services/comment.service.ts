import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  apiURL: string = 'http://localhost:8000/api/';

  constructor(public http: HttpClient) { }

  //INSERIR UM COMENTÁRIO NO BD
	public addRepublicUserintoComment(comment: any, id_republic: any, id_user: any){
    return this.http.put(this.apiURL + 'addRepublicUserintoComment/' + id_republic + '/' + id_user, comment);
  }
}
