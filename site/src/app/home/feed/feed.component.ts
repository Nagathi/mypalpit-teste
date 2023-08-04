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
  private readonly pathVisualizar = environment.pathVisualizar;

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
  
  graficoSelecionado(id: number){
    for(let i = 0; i < this.graficos.length; i++){
      if(this.graficos[i].id === id){
        this.graficoService.passarDados(this.graficos[i]);
        this.http.post(`${this.apiURL}/${this.pathVisualizar}?id=${id}`, null).subscribe(response => {
          
        });
      }
    }
    this.router.navigate(['/grafico', id]);
  }
  
}
