import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nome = environment.nome
  foto = environment.foto

  constructor(
    private route: Router
  ) { }

  ngOnInit(){
  }

  sair(){
    this.route.navigate(['/entrar'])
    environment.token =''
    environment.foto =''
    environment.nome =''
    environment.id = 0
  }

}
