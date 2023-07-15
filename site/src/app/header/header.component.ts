import { Component, Renderer2 } from '@angular/core';
import { ModalCadastroService } from '../services/modal-cadastro.service';
import { ModalLoginService } from '../services/modal-login.service';
import { ModalResponseService } from '../services/modal-response.service';
import { ModalInfoService } from '../services/modal-info.service';
import { ModalAlterarService } from '../services/modal-alterar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  opcaoSelecionada: string = '';
  mostrarOpcoes: boolean = false;
  logged: boolean;
  
  constructor(private modalServiceCadastro: ModalCadastroService,
              private modalServiceLogin: ModalLoginService,
              private modalServiceResponse: ModalResponseService,
              private modalServiceInfo: ModalInfoService,
              private modalServiceAlterar: ModalAlterarService,
              private renderer: Renderer2
             ) {
    this.logged = false;
  }

  ngOnInit(){
    this.modalServiceLogin.login$.subscribe(login => {
      this.logged = login;
    });
  }

  abrirModalCadastro() {
    this.modalServiceCadastro.abrirModalCadastro();
  }

  abrirModalLogin() {
    this.modalServiceLogin.abrirModalLogin();
  }

  abrirModalResponse() {
    this.modalServiceResponse.abrirModalResponse('');
  }

  abrirModalInfo() {
    this.modalServiceInfo.abrirModalInfo();
    this.renderer.addClass(document.body, 'modal-open');
  }

  abrirModalAlterar() {
    this.modalServiceAlterar.abrirModalAlterar();
    this.renderer.addClass(document.body, 'modal-open');
  }
  
  onSubmit(){

  }

  alternarOpcoes() {
    this.mostrarOpcoes = !this.mostrarOpcoes;
  }

  sair(){
    this.logged = false;
  }
  
}
