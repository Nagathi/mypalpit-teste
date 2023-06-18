import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalCadastroService {

  private modalAbertoCadastroSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public modalAbertoCadastro$: Observable<boolean> = this.modalAbertoCadastroSubject.asObservable();

  private fecharModalCadastroSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public fecharModalCadastro$: Observable<boolean> = this.fecharModalCadastroSubject.asObservable();

  constructor() { }

  abrirModalCadastro() {
    this.modalAbertoCadastroSubject.next(true);
  }

  fecharModalCadastro() {
    this.fecharModalCadastroSubject.next(false);
  }
}
