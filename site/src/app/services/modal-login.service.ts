import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalLoginService {

  private modalAbertoLoginSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public modalAbertoLogin$: Observable<boolean> = this.modalAbertoLoginSubject.asObservable();

  private fecharModalLoginSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public fecharModalLogin$: Observable<boolean> = this.fecharModalLoginSubject.asObservable();

  private loginSubject = new Subject<boolean>();
  login$ = this.loginSubject.asObservable();
  
  constructor() { }

  abrirModalLogin() {
    this.modalAbertoLoginSubject.next(true);
  }

  fecharModalLogin() {
    this.fecharModalLoginSubject.next(false);
  }

  emitLogin(login: boolean) {
    this.loginSubject.next(login);
  }
  
}
