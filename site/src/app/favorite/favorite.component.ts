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
    this.userService.usuario$.subscribe(data =>
      {
        this.id = data.codigo;
      });
    this.http.get<any[]>(`${this.apiURL}/${this.pathSalvos}/${this.id}`).subscribe(data => {
      this.salvos = data.map(file => ({
        id: file.id,
        arquivo: file.pathArquivo,
        imagem: this.apiURL+"/"+file.pathImagem,
        titulo: file.titulo,
        keywords: file.palavrasChave,
        descricao: file.descricao,
        data: file.data,
        hora: file.hora,
        curtidas: file.curtidas,
        usuario: file.autorNome,
        avatar: this.apiURL+"/"+file.pathFotoAutor
      }));
      this.qtdFavoritos = this.salvos.length;
      for(let i = 0; i < this.salvos.length; i++){
        const strSemEspacos = this.salvos[i].keywords.replace(/,/g, '').trim();
        const palavras = strSemEspacos.split(" ");
        const hashtags = palavras.map((palavra: any) => `#${palavra}`);
        this.salvos[i].keywords = hashtags.join(" ");
      }
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
