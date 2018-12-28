import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core'

import { Frase } from '../shared/frase.model';
import { frases } from './frases-mock';

declare function JSExterno(): any;

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']})

export class PainelComponent implements OnInit {

  public Frases: Frase[] = frases
  public instrucao: string = "Traduza a frase"
  public resposta: string = ""

  public rodada: number = 0
  public rodadaFrase: Frase

  public count_progresso: number = 0

  public tentativas: number = 3

  public fraseCorreta: string

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()
  
  constructor() {
    this.atualizaRodada()
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value  
  }  

  public verificarResposta(): void {

    if (this.rodadaFrase.frasePtBr.toLowerCase() == this.resposta.toLowerCase()) {      

      this.rodada++   

      this.count_progresso = this.count_progresso + (100 / this.Frases.length)   

      if (this.rodada === this.Frases.length)
      {
        this.encerrarJogo.emit('vitoria')
        alert('Parabéns, você completou todas as traduções!!!')
      }
      else
      {
        this.atualizaRodada()
      }
    
    } else {

      this.tentativas--

      this.fraseCorreta = this.rodadaFrase.frasePtBr

      if (this.tentativas === -1) {
        this.encerrarJogo.emit('derrota')
        alert('Você perdeu todas as tentativas')
      }
    }
  }

  public atualizaRodada(): void {
    this.rodadaFrase = this.Frases[this.rodada]
    this.resposta = ''
  }  
}