import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core'

import { Frase } from '../shared/frase.model';
import { frases } from './frases-mock';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

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

  public tentativas: number = frases.length -1
  public acertos: number = 0

  public fraseCorreta: string

  public podeProsseguir: boolean = true
  public podeVerificar: boolean = false

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()
  
  constructor() {
    this.rodadaFrase = this.Frases[this.rodada]
    this.resposta = ''    
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value  
    this.trocaParaVerificar()
  }  

  public verificarResposta(): void {

    if (this.rodadaFrase.frasePtBr.toLowerCase().trim() == this.resposta.toLowerCase().trim()) {        

      this.acertos += 1      

      this.atualizaRodada()

      if (this.acertos === this.Frases.length)
      {
        this.vitoria()
      }

    } else {

      this.tentativas--

      this.fraseCorreta = this.rodadaFrase.frasePtBr

      this.trocaParaProsseguir()

      if (this.tentativas === -1) {
        this.fimDeJogo()
      }
    }    
      
  }

  public atualizaRodada(): void {

    this.rodada++   
    this.count_progresso = this.count_progresso + (100 / this.Frases.length)   
    console.log(`tentativas = ${this.tentativas}`)
    console.log(`rodada = ${this.rodada}`)
    console.log(`total frases = ${this.Frases.length}`)

    if (this.rodada == this.Frases.length) {
      this.fimDeJogo()
    } else {

      this.rodadaFrase = this.Frases[this.rodada]
      this.resposta = ''    
      this.fraseCorreta = ''
    }    
  }  

  private trocaParaProsseguir(): void {
    this.podeProsseguir = false
    this.podeVerificar = true
  }

  private trocaParaVerificar(): void {
    this.podeProsseguir = true
    this.podeVerificar = false
  }  

  private fimDeJogo(): void {
    if (this.tentativas === -1) {
      this.encerrarJogo.emit('derrota')
        alert('Todas as tentativas foram esgotadas... fim de jogo XS')      
    } else if (this.acertos > 0) {
      this.encerrarJogo.emit('derrota')
      alert(`Você fez ${this.acertos} pontos, mas não conseguiu completar o desafio. Tente novamente ;)`)      
    }
  }

  private vitoria(): void {
    this.encerrarJogo.emit('vitoria')
    alert('Mandou bem! Completou todas as traduções corretamente. Você ganhou! xD')    
  }
}