import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent {
  opcaoSelecionada: string = 'Todas';

  selecionarOpcao(opcao: string) {
    this.opcaoSelecionada = opcao;
  }
}
