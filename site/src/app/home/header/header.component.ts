import { Component, Renderer2 } from '@angular/core';
import { ModalCadastroService } from '../../services/modal-cadastro.service';
import { ModalLoginService } from '../../services/modal-login.service';
import { ModalResponseService } from '../../services/modal-response.service';
import { ModalInfoService } from '../../services/modal-info.service';
import { ModalAlterarService } from '../../services/modal-alterar.service';
import { UsuarioService } from '../../services/usuario.service';
import { environment } from 'environment';
import { HttpClient } from '@angular/common/http';
import { GraficoService } from 'src/app/services/grafico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] 
})
export class HeaderComponent {
  private readonly apiURL = environment.apiURL;
  private readonly pathPesquisar = environment.pathPesquisar;

  opcaoSelecionada: string = '';
  mostrarOpcoes: boolean = false;
  logged: boolean;
  avatar: string = '';

  key: string = '';
  
  constructor(private modalServiceCadastro: ModalCadastroService,
              private modalServiceLogin: ModalLoginService,
              private modalServiceResponse: ModalResponseService,
              private modalServiceInfo: ModalInfoService,
              private modalServiceAlterar: ModalAlterarService,
              private userService: UsuarioService,
              private graficoService: GraficoService,
              private http: HttpClient,
              private router: Router,
              private renderer: Renderer2
             ) {
    this.logged = false;
  }

  ngOnInit(){
    
    this.modalServiceLogin.login$.subscribe(login => {
      this.logged = login;
      this.userService.usuario$.subscribe(usuario =>{
        this.avatar = this.apiURL+'/'+this.userService.usuario.foto;
      });
    });
  }

  pesquisar(){
    this.http.get<any[]>(`${this.apiURL}/${this.pathPesquisar}?palavra=${this.key}`).subscribe(data => {
      this.graficoService.responsePesquisa(data);
      this.router.navigate(['/busca']);
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
