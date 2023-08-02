import { Component } from '@angular/core';
import { GraficoService } from '../services/grafico.service';
import { Router } from '@angular/router';
import { environment } from 'environment.prod';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent {
  private readonly apiURL = environment.apiURL;
  opcaoSelecionada: string = 'Novos';
  itensPorPagina = 6;
  paginaAtual = 1;
  sections: any[] = [];

  constructor(private graficoService: GraficoService,
              private router: Router){

  }

  ngOnInit() {
    this.graficoService.pesquisa$.subscribe(
      (graficos: any) => {
        if (graficos) {
          this.sections = graficos.map((file: any) => {
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
        }
      }
    );
  }

  

  selecionarOpcao(opcao: string) {
    this.opcaoSelecionada = opcao;
  }

  getSectionsPorPagina(): any[] {
    if (this.sections) {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
      const fim = inicio + this.itensPorPagina;
      return this.sections.slice(inicio, fim);
    }
    return [];
  }

  totalPaginas(): number {
    if (this.sections) {
      return Math.ceil(this.sections.length / this.itensPorPagina);
    }
    return 0;
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
      }
    }
    this.router.navigate(['/grafico', grafico]);
  }
}
