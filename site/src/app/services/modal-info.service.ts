import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalInfoService {

  private modalAbertoInfoSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public modalAbertoInfo$: Observable<boolean> = this.modalAbertoInfoSubject.asObservable();

  private fecharModalInfoSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public fecharModalInfo$: Observable<boolean> = this.fecharModalInfoSubject.asObservable();

  private InfoSubject = new Subject<boolean>();
  login$ = this.InfoSubject.asObservable();

  constructor() { }

  abrirModalInfo() {
    this.modalAbertoInfoSubject.next(true);
  }

  fecharModalInfo() {
    this.fecharModalInfoSubject.next(false);
  }

}
