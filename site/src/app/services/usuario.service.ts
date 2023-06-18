import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080'; // URL da API
  private usuarioSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public usuario$: Observable<any> = this.usuarioSubject.asObservable();

  constructor(private http: HttpClient) {}

  get usuario(): any {
    return this.usuarioSubject.value;
  }

  setUsuario(usuario: any) {
    this.usuarioSubject.next(usuario);
  }

  atualizarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/atualizar_user/${id}`, usuario);
  }
}
