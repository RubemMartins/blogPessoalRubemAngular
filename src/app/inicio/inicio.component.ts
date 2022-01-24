import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from './../model/Postagem';
import { AuthService } from './../service/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private route: Router
  ) { }

  ngOnInit(){
    if (environment.token == ''){
      alert('Sua sessão expirou, faça o login novamente.')
      this.route.navigate(['/entrar'])
    }
  }

}
