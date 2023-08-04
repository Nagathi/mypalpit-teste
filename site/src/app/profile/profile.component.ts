import { Component, HostListener, Injectable } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environment';
import { GraficoService } from '../services/grafico.service';
import { Router } from '@angular/router';

@Injectable()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  private readonly apiURL = environment.apiURL;
  private readonly pathAttUser = environment.pathAttUser;
  private readonly pathDestaques = environment.pathDestaques;
  private readonly pathVisualizar = environment.pathVisualizar;
  
  codigo = this.usuarioService.usuario.codigo;
  foto = this.apiURL + "/" + this.usuarioService.usuario.foto;
  nome = this.usuarioService.usuario.nome;
  email = this.usuarioService.usuario.email;
  usuario = this.usuarioService.usuario.usuario;
  sobre = this.usuarioService.usuario.sobre;
  cidade = this.usuarioService.usuario.cidade;
  imagemSelecionada: File | null = null;

  editar: boolean = false;
  graficos: any[] = []
  itensPorPagina = 6;
  paginaAtual = 1;
  constructor(
    private usuarioService: UsuarioService,
    private http: HttpClient,
    private graficoService: GraficoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.http.get<any[]>(`${this.apiURL}/${this.pathDestaques}/${this.codigo}`).subscribe(data => {
      this.graficos = data.map(file => {
        const formattedKeywords = Array.isArray(file.keywords)
            ? file.keywords.map((keyword: any) => `#${keyword.palavra}`)
            : [];
        const formattedDisciplinas = Array.isArray(file.materias)
            ? file.materias.map((materia: any) => `${materia.disciplina}, `)
            : [];
        const formattedNiveis = Array.isArray(file.materias)
            ? file.materias.map((materia: any) => `${materia.nivel}, `)
            : [];
          return {
            arquivo: file.pathArquivo,
            avatar: this.apiURL+"/"+file.pathFotoAutor,
            curtidas: file.curtidas,
            data: file.data,
            descricao: file.descricao,
            disciplina: formattedDisciplinas,
            downloads: file.downloads,
            hora: file.hora,
            id: file.id,
            imagem: this.apiURL+"/"+file.pathImagem,
            impressora: file.impressora,
            keywords: formattedKeywords,
            nivel: formattedNiveis,
            titulo: file.titulo,
            usuario: file.autorNome,
            views: file.views,
        };
      });
      this.graficos.sort((a, b) => b.id - a.id);
    });
    this.usuarioService.usuario$.subscribe(data =>
      {
        this.foto = this.apiURL + "/" + data.foto;
      });
  }

  goToFile(id: number){
    for(let i = 0; i < this.graficos.length; i++){
      if(this.graficos[i].id === id){
        this.graficoService.passarDados(this.graficos[i]);
        this.http.post(`${this.apiURL}/${this.pathVisualizar}?id=${id}`, null).subscribe(response => {
          
        });
      }
    }
    this.router.navigate(['/grafico', id]);
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

  getSectionsPorPagina(): any[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.graficos.slice(inicio, fim);
  }

  totalPaginas(): number {
    return Math.ceil(this.graficos.length / this.itensPorPagina);
  }
  
  mudarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas()) {
      this.paginaAtual = pagina;
    }
  }
  goToNovoEnvio(){
    this.router.navigate(['/envio']);
  }
}
