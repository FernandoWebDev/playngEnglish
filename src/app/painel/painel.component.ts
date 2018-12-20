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

  public rodada: number = 0
  public rodadaFrase: Frase

  public count_progresso: number = 0
  
  constructor() {
    this.rodadaFrase = this.Frases[this.rodada]
   }

  ngOnInit() {
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value    
  }  

  public verificarResposta(): void {

    if (this.rodadaFrase.frasePtBr.toLowerCase() == this.resposta.toLowerCase()) {      
      alert("A tradução está correta!")

      this.rodada++      
      this.rodadaFrase = this.Frases[this.rodada]
      this.count_progresso = this.count_progresso + (100 / this.Frases.length)
      
      console.log(this.count_progresso)
    } else {
      alert("A tradução está errada!")
    }    
  }

}
