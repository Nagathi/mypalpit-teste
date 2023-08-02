import { Component } from '@angular/core';
import { ModalLoginService } from '../../services/modal-login.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { UsuarioService } from '../../services/usuario.service';
import { ModalCadastroService } from 'src/app/services/modal-cadastro.service';
import { environment } from 'environment';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent {
  private readonly apiURL = environment.apiURL;
  private readonly pathLogin = environment.pathLogin;

  modalAberto: boolean = false;
  email: string = '';
  senha: string = '';
  errorMessage = '';
  error: boolean = false;

  constructor(private modalService: ModalLoginService,
              private http: HttpClient,
              private usuarioService: UsuarioService,
              private modalCadastroService: ModalCadastroService
    ) {

    this.modalService.modalAbertoLogin$.subscribe(aberto => {
      this.modalAberto = aberto;
    });
    this.modalService.fecharModalLogin$.subscribe(fechado => {
      this.modalAberto = fechado;
    });

  }

  submit(){

    this.http.get(`${this.apiURL}/${this.pathLogin}?email=${this.email}&senha=${this.senha}`)
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
          this.error = false;
        },
        (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.errorMessage = 'Usuário não encontrado!';
            this.error = true;
          } else {
            this.errorMessage = 'Lamentamos muito. Ocorreu um erro inesperado :(';
            this.error = true;
          }
        }
      );
  }

  fecharModalLogin() {
    this.modalService.fecharModalLogin();
  }

  redirectToCadastrar() {
    this.modalService.fecharModalLogin();
    this,this.modalCadastroService.abrirModalCadastro();
  }
}
