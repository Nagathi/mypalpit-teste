import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'environment';
import { GraficoService } from '../../services/grafico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent {
  private readonly apiURL = environment.apiURL;
  private readonly pathBusca = environment.pathBusca;

  opcaoSelecionada: string = 'Todas';
  searchTerm: string = '';
  opcao1: boolean = false;
  opcao2: boolean = false;
  opcao3: boolean = false;
  opcao4: boolean = false;

  arquivos: any[] = [];
  palavrasChave: string[] = [];
  disciplina: string = '';

  constructor(private http: HttpClient,
              private graficoService: GraficoService,
              private router: Router){}

  selecionarOpcao(opcao: string) {
    this.opcaoSelecionada = opcao;
  }

  submit(){
    const formData = {
      palavrasChave: this.searchTerm.split(',').map((keyword: any) => keyword.trim()),
      disciplina: this.opcaoSelecionada,
      nivel: this.getSelectedNiveis()
    };

    if(this.opcaoSelecionada == 'Todas'){
      formData.disciplina = ''
    } 

    this.http.get<any[]>(`${this.apiURL}/${this.pathBusca}`, { params: formData })
      .subscribe(
        (arquivos: any) => {
          this.arquivos = arquivos;
          this.graficoService.responsePesquisa(this.arquivos);
          this.router.navigate(['/busca']);
        },
        (error: any) => {
          console.error('Erro ao buscar os arquivos:', error);
        }
      );
  }

  private getSelectedNiveis(): string[] {
    const niveis: string[] = [];
    if (this.opcao1) {
      niveis.push('Fundamental I');
    }
    if (this.opcao2) {
      niveis.push('Fundamental II');
    }
    if (this.opcao3) {
      niveis.push('Médio');
    }
    if (this.opcao4) {
      niveis.push('Superior');
    }
    return niveis;
  }
}
