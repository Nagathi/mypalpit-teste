import { Component, Injectable } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  codigo: string = ''
  foto: string = '';
  nome: string = '';
  usuario: string = '';
  sobre: string = '';
  cidade: string = '';
  email: string = '';
  imagemSelecionada: File | null = null;

  editar: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    if (this.usuarioService.usuario) {
      this.carregarDadosUsuario();
    } else {
      this.usuarioService.usuario$.subscribe((user) => {
        this.carregarDadosUsuario();
      });
    }
  }

  carregarDadosUsuario() {
    if (this.usuarioService.usuario) {
      this.codigo = this.usuarioService.usuario.codigo || '???';
      this.foto = "http://localhost:8080/" + this.usuarioService.usuario.foto || '';
      this.nome = this.usuarioService.usuario.nome || '';
      this.email = this.usuarioService.usuario.email || '';
      this.usuario = this.usuarioService.usuario.usuario || '';
      this.sobre = this.usuarioService.usuario.sobre || '';
      this.cidade = this.usuarioService.usuario.cidade || '';
    }
  }

  onClick() {
    this.editar = true;
  }

  cancelar() {
    this.editar = false;
  }

  onImageSelected(event: any) {
    this.imagemSelecionada = event.target.files[0];
  }

  salvar() {
  
    const usuario = {
      nome: this.nome,
      email: this.email,
      usuario: this.usuario,
      senha: this.usuarioService.usuario.senha,
      cidade: this.cidade,
      sobre: this.sobre
      // Adicione aqui os outros campos do formulário
    };
  
    const idNumber = parseInt(this.usuarioService.usuario.codigo);
  
    this.atualizarUsuario(idNumber, usuario);
  }

  private atualizarUsuario(id: number, usuario: any) {
    this.http.put(`http://localhost:8080/atualizar_user/${id}`, usuario).subscribe(
      (response: any) => {
        alert('Dados do usuário atualizados com sucesso');
        // Atualizar o usuário no serviço após a alteração
        this.usuarioService.setUsuario(usuario);
        this.editar = false;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 400) {
          alert('Erro ao atualizar dados do usuário: ' + error.error);
        } else if (error.status === 404) {
          alert('Usuário não encontrado');
        } else {
          alert('Erro desconhecido ao atualizar dados do usuário');
        }
      }
    );
  }
}
