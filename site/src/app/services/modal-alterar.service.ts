import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalAlterarService {

  private modalAbertoAlterarSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public modalAbertoAlterar$: Observable<boolean> = this.modalAbertoAlterarSubject.asObservable();

  private fecharModalAlterarSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public fecharModalAlterar$: Observable<boolean> = this.fecharModalAlterarSubject.asObservable();

  private alterarSubject = new Subject<boolean>();
  login$ = this.alterarSubject.asObservable();

  constructor() { }

  abrirModalAlterar() {
    this.modalAbertoAlterarSubject.next(true);
  }

  fecharModalAlterar() {
    this.fecharModalAlterarSubject.next(false);
  }
}
