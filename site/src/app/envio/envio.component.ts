import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'environment';
import { UsuarioService } from '../services/usuario.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrls: ['./envio.component.css']
})
export class EnvioComponent {
  private readonly apiURL: string = environment.apiURL;
  private readonly pathUploadArquivo: string = environment.pathUploadArquivo;

  nomeImagem: string = 'Nenhum arquivo selecionado';
  nomeArquivo: string = 'Nenhum arquivo selecionado';
  nivel: string = 'Fundamental I';
  disciplina: string = 'Biologia';
  change: boolean = false;
  materias: any[] = [];
  keywords: any[] = [];
  niveis: any[] = [];
  disciplinas: any[] = [];

  imagemPreview!: SafeUrl;

  imagem!: File;
  arquivo!: File;
  titulo: string = '';
  palavras: string = ''
  descricao: string = ''
  materias_str: string = ''

  constructor(private http: HttpClient,
              private userService: UsuarioService,
              private sanitizer: DomSanitizer,
              private router: Router){
  }

  createImagePreview(image: File): void {
    const reader = new FileReader();
  
    reader.onload = () => {
      this.imagemPreview = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
    };
  
    reader.readAsDataURL(image);
  }

  onFileChange(event: any, tipo: string) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (tipo === 'imagem') {
        this.imagem = selectedFile;
        this.nomeImagem = selectedFile.name;
        this.createImagePreview(this.imagem);
      } else if (tipo === 'arquivo') {
        this.arquivo = selectedFile;
        this.nomeArquivo = selectedFile.name;
      }
    } else {
      if (tipo === 'imagem') {
        this.nomeImagem = 'Nenhum arquivo selecionado';
      } else if (tipo === 'arquivo') {
        this.nomeArquivo = 'Nenhum arquivo selecionado';
      }
    }
  }

  addMateria() {
    const novaMateria = {
      nivel: this.nivel,
      disciplina: this.disciplina
    };
    
    this.materias.push(novaMateria);
  }

  removerMateria(materia: any) {
    const index = this.materias.indexOf(materia);
    if (index !== -1) {
      this.materias.splice(index, 1);
    }
  }
  
  salvarArquivo(){

    this.keywords = this.palavras.split(", ");
    const keywordsArray = this.keywords.map(palavra => ({ palavra }));
    
    const dataAtual = new Date();
    const data = `${dataAtual.getDate().toString().padStart(2, '0')}-${(dataAtual.getMonth() + 1).toString().padStart(2, '0')}-${dataAtual.getFullYear()}`;
    const hora = `${dataAtual.getHours().toString().padStart(2, '0')}:${dataAtual.getMinutes().toString().padStart(2, '0')}`;
    
    const formData = new FormData();
    formData.append('file', this.arquivo);
    formData.append('image', this.imagem);
    formData.append('titulo', this.titulo);
    formData.append('descricao', this.descricao);
    formData.append('autor', this.userService.usuario.codigo);
    formData.append('data', data);
    formData.append('hora', hora);
    formData.append('materias', JSON.stringify(this.materias));
    formData.append('keywords', JSON.stringify(keywordsArray));

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    this.http.post<any>(`${this.apiURL}/${this.pathUploadArquivo}`, formData, { headers }).subscribe(
      (response: any) => {
        console.log('Arquivo salvo com sucesso!', response);
        this.titulo = '';
        this.palavras = ''
        this.descricao = ''
        this.materias_str = ''
        this.materias = [];
      },
      (error: any) => {
        console.error('Erro ao salvar o arquivo:', error);
      }
    );
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  onChangeMais(){
    this.change = true;
    this.disciplina = '';
  }

  onChangeMenos(){
    this.change = false;
    this.disciplina = 'Biologia';
  }

}
