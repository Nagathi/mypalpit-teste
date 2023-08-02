import { Component } from '@angular/core';
import { GraficoService } from '../services/grafico.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environment';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent {
  private readonly apiURL = environment.apiURL;
  private readonly pathSalvarArquivo = environment.pathSalvarArquivo;
  private readonly pathComentar = environment.pathComentar;
  private readonly pathListarComentarios = environment.pathListarComentarios;
  grafico!: any;
  comment = false;
  descricao: string = '';
  comentarios: any[] = [];

  constructor(private graficoService: GraficoService,
              private http: HttpClient,
              private userService: UsuarioService) { }

  ngOnInit() {
    this.graficoService.grafico$.subscribe(
      (graficoAtualizado: any) => {
        this.grafico = graficoAtualizado;
      }
    );
    this.http.get<any[]>(`${this.apiURL}/${this.pathListarComentarios}?arquivo=${this.grafico.id}`).subscribe((data) => {
        this.comentarios = data.map((file: any) => {
          return {
            foto: this.apiURL+"/"+file.pathFoto,
            user: file.usuario,
            descricao: file.descricao
          }
        })
    });
  }

  salvar(){
    this.http.post(`${this.apiURL}/${this.pathSalvarArquivo}?arquivo_id=${this.grafico.id}&usuario_id=${this.userService.usuario.codigo}`, null).subscribe(response => {
      alert(response)
    });
  }

  comentar(){
    this.comment = true;
  }

  enviarComentario(){
    this.comment = false;
    const formData = {
      arquivo: this.grafico.id,
      usuario: this.userService.usuario.codigo,
      descricao: this.descricao
    };
    this.http.post(`${this.apiURL}/${this.pathComentar}?arquivo=${formData.arquivo}&usuario=${formData.usuario}&descricao=${formData.descricao}`, null).subscribe(ressponse => {
      console.log(Response)
    })
  }
}

