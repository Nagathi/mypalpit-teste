import { Component, Injectable } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environment';

@Injectable()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  apiURL = environment.apiURL;
  pathAttUser = environment.pathAttUser;

  codigo = this.usuarioService.usuario.codigo;
  foto = this.apiURL + "/" + this.usuarioService.usuario.foto;
  nome = this.usuarioService.usuario.nome;
  email = this.usuarioService.usuario.email;
  usuario = this.usuarioService.usuario.usuario;
  sobre = this.usuarioService.usuario.sobre;
  cidade = this.usuarioService.usuario.cidade;
  imagemSelecionada: File | null = null;

  editar: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.usuarioService.usuario$.subscribe(data =>
      {
        this.foto = this.apiURL + "/" + data.foto;
      });
  }

  onClick() {
    this.editar = true;
  }

  cancelar() {
    this.editar = false;
  }

  salvar() {
  
    const usuario = {
      nome: this.nome,
      foto: this.usuarioService.usuario.foto,
      email: this.email,
      usuario: this.usuario,
      senha: this.usuarioService.usuario.senha,
      cidade: this.cidade,
      sobre: this.sobre
      
    };
    const idNumber = parseInt(this.usuarioService.usuario.codigo);
  
    this.atualizarUsuario(idNumber, usuario);
  }


  private atualizarUsuario(id: number, usuario: any) {
    this.http.put(`${this.apiURL}/${this.pathAttUser}/${id}`, usuario).subscribe(
      (response: any) => {
        alert('Dados do usuário atualizados com sucesso');
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
