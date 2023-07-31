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
  salvos!: any[];

  selecionarOpcao(opcao: string) {
    this.opcaoSelecionada = opcao;
  }

  constructor(private http: HttpClient,
              private userService: UsuarioService,
              private graficoService: GraficoService,
              private router: Router){

  }

  ngOnInit(){
    this.http.get<any[]>(`${this.apiURL}/${this.pathSalvos}/${this.id}`).subscribe(data => {
      this.salvos = data.map(file => {
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
      this.qtdFavoritos = this.salvos.length;
    });
  } 

  goToFile(id: number){
    for(let i = 0; i < this.salvos.length; i++){
      if(this.salvos[i].id === id){
        this.graficoService.passarDados(this.salvos[i]);
      }
    }
    this.router.navigate(['/grafico', id]);
  }
}
