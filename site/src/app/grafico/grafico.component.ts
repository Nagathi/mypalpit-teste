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
  grafico!: any;
  private readonly apiURL = environment.apiURL;
  private readonly pathSalvarArquivo = environment.pathSalvarArquivo;

  constructor(private graficoService: GraficoService,
              private http: HttpClient,
              private userService: UsuarioService) { }

  ngOnInit() {
    this.graficoService.grafico$.subscribe(
      (graficoAtualizado: any) => {
        this.grafico = graficoAtualizado;
      }
    );
  }

  salvar(){
    this.http.post(`${this.apiURL}/${this.pathSalvarArquivo}?arquivo_id=${this.grafico.id}&usuario_id=${this.userService.usuario.codigo}`, null).subscribe(response => {
      alert(response)
    });
  }
}

