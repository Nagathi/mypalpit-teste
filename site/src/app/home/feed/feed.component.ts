import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'environment';
import { Router } from '@angular/router';
import { GraficoService } from 'src/app/services/grafico.service';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent {
  private readonly apiURL = environment.apiURL;
  private readonly pathListarAquivos = environment.pathListarAquivos;

  encontrado: boolean = false;
  opcaoSelecionada: string = 'Novos';
  itensPorPagina = 6;
  paginaAtual = 1;
  sections: any[] = [];
  arquivos: any[] = []

  constructor(private http: HttpClient,
              private graficoService: GraficoService,
              private router: Router){

  }

  ngOnInit() {
    this.http.get<any[]>(`${this.apiURL}/${this.pathListarAquivos}`).subscribe(
      (arquivos) => {
        this.sections = arquivos.map(file => {
          const formattedKeywords = Array.isArray(file.keywords)
            ? file.keywords.map((keyword: any) => `#${keyword.palavra}`)
            : [];

          return {
            id: file.id,
            arquivo: file.pathArquivo,
            imagem: this.apiURL+"/"+file.pathImagem,
            titulo: file.titulo,
            keywords: formattedKeywords,
            descricao: file.descricao,
            data: file.data,
            hora: file.hora,
            curtidas: file.curtidas,
            usuario: file.autorNome,
            avatar: this.apiURL+"/"+file.pathFotoAutor
          };
        });
      },
      (error) => {
        console.error('Erro ao carregar os arquivos:', error);
      }
    );
  }

  

  selecionarOpcao(opcao: string) {
    this.opcaoSelecionada = opcao;
  }

  getSectionsPorPagina(): any[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.sections.slice(inicio, fim);
  }

  totalPaginas(): number {
    return Math.ceil(this.sections.length / this.itensPorPagina);
  }
  
  mudarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas()) {
      this.paginaAtual = pagina;
    }
  }
  
  graficoSelecionado(grafico: number){
    for(let i = 0; i < this.sections.length; i++){
      if(this.sections[i].id === grafico){
        this.graficoService.passarDados(this.sections[i]);
        this.encontrado = true;
      }
    }
    this.router.navigate(['/grafico', grafico]);
  }
  
}
