import { Component } from '@angular/core';
import { ModalCadastroService } from '../../services/modal-cadastro.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UsuarioService } from '../../services/usuario.service';
import { ModalLoginService } from '../../services/modal-login.service';

@Component({
  selector: 'app-modal-cadastro',
  templateUrl: './modal-cadastro.component.html',
  styleUrls: ['./modal-cadastro.component.css']
})
export class ModalCadastroComponent {
  modalAberto: boolean = false;
  nome: string = '';
  email: string = '';
  senha: string = '';
  usuario: string = '';
  errorMessage = '';
  error: boolean = false;
  confirmarSenha: string = '';

  constructor(private modalService: ModalCadastroService,
              private http: HttpClient,
              private usuarioService: UsuarioService,
              private loginService: ModalLoginService) {
    this.modalService.modalAbertoCadastro$.subscribe(aberto => {
      this.modalAberto = aberto;
    });
    this.modalService.fecharModalCadastro$.subscribe(fechado => {
      this.modalAberto = fechado;
    });
  }

  submitForm() {

    const usuarioModelo: any = {

      nome: this.nome,
      email: this.email,
      usuario: this.usuario,
      senha: this.senha

    }
    
    this.http.post('http://localhost:8080/cadastrar_usuarios', usuarioModelo)
    .subscribe(
      (response) => {
        this.usuarioService.setUsuario(response);
        this.loginService.emitLogin(true);
        this.modalService.fecharModalCadastro();

      },
      (error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // Erro ocorreu no cliente-side ou durante a comunicação
          this.errorMessage = 'Lamentamos muito. Ocorreu um erro inesperado:(';
          this.error = true;
        } else {
          // Erro ocorreu no servidor-side
          this.errorMessage = 'Lamentamos muito. Ocorreu um erro inesperado em nosso servidor :(';
          this.error = true;
        }
      }
    )
   
  }

  confirmarSenhaCoincide(): boolean {
  return this.senha === this.confirmarSenha;
  }


  fecharModalCadastro() {
    this.modalService.fecharModalCadastro();
  }

  redirectToEntrar() {
    this.modalService.fecharModalCadastro();
    this.loginService.abrirModalLogin();
  }
}



