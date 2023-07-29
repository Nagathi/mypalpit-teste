import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraficoService {
  grafico!: any;

  graficoAtualizadoSubject:  BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.grafico);
  grafico$ = this.graficoAtualizadoSubject.asObservable();

  constructor() { }

  passarDados(grafico: any){
    this.graficoAtualizadoSubject.next(grafico);
  }
}
