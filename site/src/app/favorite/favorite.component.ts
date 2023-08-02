import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'environment';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { GraficoService } from '../services/grafico.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {
  private readonly apiURL = environment.apiURL;
  private readonly pathSalvos = environment.pathSalvos;

  qtdFavoritos: any = 0;
  opcaoSelecionada: string = 'Novos';
  id: string = this.userService.usuario.codigo;
  graficos: any[] = [];
  itensPorPagina = 6;
  paginaAtual = 1;

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

  constructor(private http: HttpClient,
              private userService: UsuarioService,
              private graficoService: GraficoService,
              private router: Router){

  }

  ngOnInit(){
    this.http.get<any[]>(`${this.apiURL}/${this.pathSalvos}/${this.id}`).subscribe(data => {
      this.graficos = data.map(file => {
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
      this.qtdFavoritos = this.graficos.length;
    });
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

  goToFile(id: number){
    for(let i = 0; i < this.graficos.length; i++){
      if(this.graficos[i].id === id){
        this.graficoService.passarDados(this.graficos[i]);
      }
    }
    this.router.navigate(['/grafico', id]);
  }
}
