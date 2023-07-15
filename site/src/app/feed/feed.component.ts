import { Component } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent {
  opcaoSelecionada: string = 'Novos';


  selecionarOpcao(opcao: string) {
    this.opcaoSelecionada = opcao;
  }
}
