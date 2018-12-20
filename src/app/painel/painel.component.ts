import { Component, OnInit } from '@angular/core'

import { Frase } from '../shared/frase.model';
import { frases } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public Frases: Frase[] = frases
  public instrucao: string = "Traduza a frase"
  public resposta: string
  
  constructor() { }

  ngOnInit() {
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
    console.log(resposta)
  }  

}
