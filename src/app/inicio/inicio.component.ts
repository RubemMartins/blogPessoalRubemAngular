import { Component, OnInit } from '@angular/core';
import { Data, Router} from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from './../model/Postagem';
import { TemaService } from '../service/tema.service';
import { Tema } from '../model/Tema';
import { PostagemService } from '../service/postagem.service';
import { AuthService } from '../service/auth.service';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  listaPostagens: Postagem[]
  postagem: Postagem = new Postagem()
  tituloPost: string

  listaTemas: Tema[]
  idTema: number
  tema: Tema = new Tema()
  nomeTema: string

  user: User = new User()
  idUser = environment.id

  key: 'data'
  reverse: true

  constructor(
    private route: Router,
    private temaService : TemaService,
    private postagemService: PostagemService,
    public authService: AuthService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if (environment.token == ''){
      this.alertas.showAlertDanger('Sua sessão expirou, faça o login novamente.')
      this.route.navigate(['/entrar'])
    }

    this.authService.refreshToken()
    this.findAllTemas()
    this.getAllPostagens()
    
  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=>{
      this.tema = resp

    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[])=>{
      this.listaPostagens = resp

    })
  }

    findByIdUser(){
      this.authService.getByIdUser(this.idUser).subscribe((resp: User)=>{
        this.user = resp
      })
    }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem realizada com sucesso')
      this.postagem = new Postagem
      this.getAllPostagens()
    })
  }

  findbyTituloPostagem(){

    if(this.tituloPost == ''){
      this.getAllPostagens()
    }else{
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[])=> {
        this.listaPostagens = resp
      })
    }
  }

  findbyNomeTema(){
    if(this.nomeTema == ''){
      this.findAllTemas
    }else{
      this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: Tema[])=>{
        this.listaTemas = resp
      })
    }
  }

}
