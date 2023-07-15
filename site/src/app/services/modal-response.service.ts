import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalResponseService {

  private modalAbertoResponseSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public modalAbertoResponse$: Observable<boolean> = this.modalAbertoResponseSubject.asObservable();

  private fecharModalResponseSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public fecharModalResponse$: Observable<boolean> = this.fecharModalResponseSubject.asObservable();

  private mensagemSubject: Subject<string> = new Subject<string>();
  public mensagem$: Observable<string> = this.mensagemSubject.asObservable();

  constructor() { }

  abrirModalResponse(mensagem: string) {
    this.mensagemSubject.next(mensagem);
    this.modalAbertoResponseSubject.next(true);
  }

  fecharModalResponse() {
    this.fecharModalResponseSubject.next(false);
  }
}
