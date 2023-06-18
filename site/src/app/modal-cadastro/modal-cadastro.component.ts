import { Component } from '@angular/core';
import { ModalCadastroService } from '../services/modal-cadastro.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UsuarioService } from '../services/usuario.service';
import { ModalLoginService } from '../services/modal-login.service';

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
          alert('Erro no cliente: ' + error.error.message);
        } else {
          // Erro ocorreu no servidor-side
          alert('Erro no servidor: ' + error.error);
        }
      }
    )
    
   
  }

  fecharModalCadastro() {
    this.modalService.fecharModalCadastro();
  }
}



