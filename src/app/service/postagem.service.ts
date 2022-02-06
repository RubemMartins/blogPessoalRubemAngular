import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllPostagens(): Observable<Postagem[]>{
    return this.http.get<Postagem[]>(' https://blogpessoalrubem.herokuapp.com/postagens', this.token)
  }

  getByIdPostagem(id: number): Observable<Postagem>{
    return this.http.get<Postagem>(` https://blogpessoalrubem.herokuapp.com/postagens/${id}`, this.token)
  }

  getByTituloPostagem(titulo: string): Observable<Postagem[]>{
    return this.http.get<Postagem[]>(` https://blogpessoalrubem.herokuapp.com/postagens/titulo/${titulo}`, this.token)
  }
  
  postPostagem(postagem: Postagem): Observable<Postagem>{
    return this.http.post<Postagem>(' https://blogpessoalrubem.herokuapp.com/postagens', postagem,this.token)
  }

  putPostagem(postagem: Postagem): Observable<Postagem>{
    return this.http.put<Postagem>(' https://blogpessoalrubem.herokuapp.com/postagens', postagem,this.token)
  }

  deletePostagem(id: number){
    return this.http.delete(` https://blogpessoalrubem.herokuapp.com/postagens/${id}`, this.token)
  }


}
