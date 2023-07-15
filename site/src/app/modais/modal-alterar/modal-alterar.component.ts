import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ModalAlterarService } from 'src/app/services/modal-alterar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modal-alterar',
  templateUrl: './modal-alterar.component.html',
  styleUrls: ['./modal-alterar.component.css']
})
export class ModalAlterarComponent {
  modalAberto: boolean = false;
  error: boolean = false;
  errorMessage: string = ''

  senha1 = '';
  senha2 = '';
  senha3 = '';

  constructor(private modalService: ModalAlterarService,
    private http: HttpClient,
    private usuarioService: UsuarioService,
) {

  this.modalService.modalAbertoAlterar$.subscribe(aberto => {
  this.modalAberto = aberto;
  });
  this.modalService.fecharModalAlterar$.subscribe(fechado => {
  this.modalAberto = fechado;
  });

}

  fecharModalAlterar(){
    this.modalService.fecharModalAlterar();
  }

  submit(){
    if(this.senha1 ==  this.usuarioService.usuario.senha){
      if(this.senha2 == this.senha3){
        const usuarioModelo = {
          senha: this.senha2
        }
        let codigo = parseInt(this.usuarioService.usuario.codigo);
        this.http.put(`http://localhost:8080/atualizar_senha/${codigo}`, usuarioModelo).subscribe(
          (response: any) => {
            this.modalService.fecharModalAlterar();
            this.usuarioService.setUsuario(usuarioModelo);
          },
          (error: HttpErrorResponse) => {
           if (error.status === 404) {
              this.error = true;
              this.errorMessage = 'Usuário não encontrado';
            } else {
              this.error = true;
              this.errorMessage = 'Erro desconhecido ao atualizar dados do usuário';
            }
          }
        );
      }else{
        this.error = true;
        this.errorMessage = "A nova senha e a confirmação não coincidem";
      }
    }else{
      this.error = true;
      this.errorMessage = "A senha informada e a senha do usuário não coincidem";
    }
  }

}
