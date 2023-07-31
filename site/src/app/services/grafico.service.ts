import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraficoService {
  grafico!: any;
  pesquisa!: any[];

  graficoAtualizadoSubject:  BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.grafico);
  grafico$ = this.graficoAtualizadoSubject.asObservable();

  graficosPesquisaSubject:  BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.pesquisa);
  pesquisa$ = this.graficosPesquisaSubject.asObservable();

  constructor() { }

  responsePesquisa(pesquisa: any[]){
    this.graficosPesquisaSubject.next(pesquisa);
  }

  passarDados(grafico: any){
    this.graficoAtualizadoSubject.next(grafico);
  }
}
