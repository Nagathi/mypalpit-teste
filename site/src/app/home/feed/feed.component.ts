import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
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

  opcaoSelecionada: string = 'Novos';
  itensPorPagina = 6;
  paginaAtual = 1;
  graficos: any[] = [];
  arquivos: any[] = []

  constructor(private http: HttpClient,
              private graficoService: GraficoService,
              private router: Router){

  }

  ngOnInit() {
    this.http.get<any[]>(`${this.apiURL}/${this.pathListarAquivos}`).subscribe(
      (arquivos) => {
        this.graficos = arquivos.map(file => {
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

        this.graficos.sort((a, b) => b.id - a.id);
      },
      (error) => {
        console.error('Erro ao carregar os arquivos:', error);
      }
    );
  }

  reordenarArray() {
    if (this.opcaoSelecionada === 'Novos') {
      this.graficos.sort((a, b) => b.id - a.id);
    } else if (this.opcaoSelecionada === 'Antigos') {
      this.graficos.sort((a, b) => a.id - b.id);
    } else if (this.opcaoSelecionada === 'Populares') {
      this.graficos.sort((a, b) => b.curtidas - a.curtidas);
    }
  }  

  selecionarOpcao(opcao: string) {
    this.opcaoSelecionada = opcao;
    this.reordenarArray();
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
  
  graficoSelecionado(grafico: number){
    for(let i = 0; i < this.graficos.length; i++){
      if(this.graficos[i].id === grafico){
        this.graficoService.passarDados(this.graficos[i]);
      }
    }
    this.router.navigate(['/grafico', grafico]);
  }
  
}
