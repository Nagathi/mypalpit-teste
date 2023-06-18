import { Component } from '@angular/core';
import { ModalCadastroComponent } from '../modal-cadastro/modal-cadastro.component';
import { ModalCadastroService } from '../services/modal-cadastro.service';
import { ModalLoginService } from '../services/modal-login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  opcoes: string[] = ['Editar perfil', 'Alterar senha', 'Sair']
  opcaoSelecionada: string = '';
  mostrarOpcoes: boolean = false;
  logged: boolean;
  
  constructor(private modalServiceCadastro: ModalCadastroService,
              private modalServiceLogin: ModalLoginService
             ) {
    this.logged = false
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

  onSubmit(){

  }

  selecionarOpcao(opcao: string) {
    this.opcaoSelecionada = opcao;
    this.mostrarOpcoes = false;
  }

  alternarOpcoes() {
    this.mostrarOpcoes = !this.mostrarOpcoes;
  }
}
