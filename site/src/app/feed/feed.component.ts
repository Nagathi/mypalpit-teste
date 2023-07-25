import { Component } from '@angular/core';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent {
  opcaoSelecionada: string = 'Novos';
  itensPorPagina = 6;
  paginaAtual = 1;
  sections: any[] = [
    {
      nome: 'Nome',
      usuario: 'Gustavo da Silva Neves 1',
      imagem: 'assets/img/icon/1142818.jpg',
      avatar: 'assets/img/icon/avatar.svg'
    },
    {
      nome: 'Nome',
      usuario: 'Gustavo da Silva Neves 2',
      imagem: 'assets/img/icon/1142818.jpg',
      avatar: 'assets/img/icon/avatar.svg'
    },
    {
      nome: 'Nome',
      usuario: 'Gustavo da Silva Neves 3',
      imagem: 'assets/img/icon/1142818.jpg',
      avatar: 'assets/img/icon/avatar.svg'
    },
    {
      nome: 'Nome',
      usuario: 'Gustavo da Silva Neves 4',
      imagem: 'assets/img/icon/1142818.jpg',
      avatar: 'assets/img/icon/avatar.svg'
    },
    {
      nome: 'Nome',
      usuario: 'Gustavo da Silva Neves 5',
      imagem: 'assets/img/icon/1142818.jpg',
      avatar: 'assets/img/icon/avatar.svg'
    },
    {
      nome: 'Nome',
      usuario: 'Gustavo da Silva Neves 6',
      imagem: 'assets/img/icon/1142818.jpg',
      avatar: 'assets/img/icon/avatar.svg'
    },
    {
      nome: 'Nome',
      usuario: 'Gustavo da Silva Neves 7',
      imagem: 'assets/img/icon/1142818.jpg',
      avatar: 'assets/img/icon/avatar.svg'
    },
    {
      nome: 'Nome',
      usuario: 'Gustavo da Silva Neves 8',
      imagem: 'assets/img/icon/1142818.jpg',
      avatar: 'assets/img/icon/avatar.svg'
    },
    {
      nome: 'Nome',
      usuario: 'Gustavo da Silva Neves 9',
      imagem: 'assets/img/icon/1142818.jpg',
      avatar: 'assets/img/icon/avatar.svg'
    },
    {
      nome: 'Nome',
      usuario: 'Gustavo da Silva Neves 10',
      imagem: 'assets/img/icon/1142818.jpg',
      avatar: 'assets/img/icon/avatar.svg'
    },
    {
      nome: 'Nome',
      usuario: 'Gustavo da Silva Neves 11',
      imagem: 'assets/img/icon/1142818.jpg',
      avatar: 'assets/img/icon/avatar.svg'
    },
    {
      nome: 'Nome',
      usuario: 'Gustavo da Silva Neves 12',
      imagem: 'assets/img/icon/1142818.jpg',
      avatar: 'assets/img/icon/avatar.svg'
    },
    {
      nome: 'Nome',
      usuario: 'Gustavo da Silva Neves 1',
      imagem: 'assets/img/icon/1142818.jpg',
      avatar: 'assets/img/icon/avatar.svg'
    },
    {
      nome: 'Nome',
      usuario: 'Gustavo da Silva Neves 2',
      imagem: 'assets/img/icon/1142818.jpg',
      avatar: 'assets/img/icon/avatar.svg'
    },
    {
      nome: 'Nome',
      usuario: 'Gustavo da Silva Neves 3',
      imagem: 'assets/img/icon/1142818.jpg',
      avatar: 'assets/img/icon/avatar.svg'
    },
    {
      nome: 'Nome',
      usuario: 'Gustavo da Silva Neves 4',
      imagem: 'assets/img/icon/1142818.jpg',
      avatar: 'assets/img/icon/avatar.svg'
    },
    {
      nome: 'Nome',
      usuario: 'Gustavo da Silva Neves 5',
      imagem: 'assets/img/icon/1142818.jpg',
      avatar: 'assets/img/icon/avatar.svg'
    },
    {
      nome: 'Nome',
      usuario: 'Gustavo da Silva Neves 6',
      imagem: 'assets/img/icon/1142818.jpg',
      avatar: 'assets/img/icon/avatar.svg'
    },
    {
      nome: 'Nome',
      usuario: 'Gustavo da Silva Neves 7',
      imagem: 'assets/img/icon/1142818.jpg',
      avatar: 'assets/img/icon/avatar.svg'
    },
    {
      nome: 'Nome',
      usuario: 'Gustavo da Silva Neves 8',
      imagem: 'assets/img/icon/1142818.jpg',
      avatar: 'assets/img/icon/avatar.svg'
    },
    {
      nome: 'Nome',
      usuario: 'Gustavo da Silva Neves 9',
      imagem: 'assets/img/icon/1142818.jpg',
      avatar: 'assets/img/icon/avatar.svg'
    },
    {
      nome: 'Nome',
      usuario: 'Gustavo da Silva Neves 10',
      imagem: 'assets/img/icon/1142818.jpg',
      avatar: 'assets/img/icon/avatar.svg'
    },
    {
      nome: 'Nome',
      usuario: 'Gustavo da Silva Neves 11',
      imagem: 'assets/img/icon/1142818.jpg',
      avatar: 'assets/img/icon/avatar.svg'
    },
    {
      nome: 'Nome',
      usuario: 'Gustavo da Silva Neves 12',
      imagem: 'assets/img/icon/1142818.jpg',
      avatar: 'assets/img/icon/avatar.svg'
    },
  ];  




  selecionarOpcao(opcao: string) {
    this.opcaoSelecionada = opcao;
  }

  getSectionsPorPagina(): any[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.sections.slice(inicio, fim);
  }

  totalPaginas(): number {
    return Math.ceil(this.sections.length / this.itensPorPagina);
  }
  
  mudarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas()) {
      this.paginaAtual = pagina;
    }
  }
  
  
}
