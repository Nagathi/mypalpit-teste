import { Component } from '@angular/core';
import { ModalLoginService } from '../services/modal-login.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent {
  modalAberto: boolean = false;
  email: string = '';
  senha: string = '';

  constructor(private modalService: ModalLoginService,
              private http: HttpClient,
              private usuarioService: UsuarioService,
    ) {

    this.modalService.modalAbertoLogin$.subscribe(aberto => {
      this.modalAberto = aberto;
    });
    this.modalService.fecharModalLogin$.subscribe(fechado => {
      this.modalAberto = fechado;
    });

  }

  submit(){

    this.http.get(`http://localhost:8080/login?email=${this.email}&senha=${this.senha}`)
      .subscribe(
        (data: any) => {
          const usuario = {
            codigo: data.codigo,
            foto: data.foto,
            nome: data.nome,
            usuario: data.usuario,
            email: data.email,
            senha: data.senha,
            sobre: data.sobre,
            cidade: data.cidade
          };
          this.usuarioService.setUsuario(usuario);
          this.modalService.emitLogin(true);
          this.modalService.fecharModalLogin();
        },
        (error: HttpErrorResponse) => {
          if (error.status === 404) {
            alert('Usuário não encontrado');
          } else {
            alert('Ocorreu um erro na requisição');
          }
        }
      );
  }

  fecharModalLogin() {
    this.modalService.fecharModalLogin();
  }
}
