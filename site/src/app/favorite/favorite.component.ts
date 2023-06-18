import { Component } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {
  qtdFavoritos: any = 6;
  opcaoSelecionada: string = 'Novos';

  selecionarOpcao(opcao: string) {
    this.opcaoSelecionada = opcao;
  }
}
