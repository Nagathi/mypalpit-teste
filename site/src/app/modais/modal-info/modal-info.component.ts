import { Component, Renderer2 } from '@angular/core';
import { ModalInfoService } from 'src/app/services/modal-info.service';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.css']
})
export class ModalInfoComponent {
  openContents: number[] = [];
  modalAberto: boolean = false;

  constructor(private modalService: ModalInfoService,
              private renderer: Renderer2) {
    this.openContents = [1];
    this.modalService.modalAbertoInfo$.subscribe(aberto => {
      this.modalAberto = aberto;
    });
    this.modalService.fecharModalInfo$.subscribe(fechado => {
      this.modalAberto = fechado;
    });
  }

  toggleContent(index: number) {
    if (this.isContentOpen(index)) {
      this.openContents = [];
    } else {
      this.openContents = [index];
    }
  }  

  isContentOpen(index: number) {
    return this.openContents.includes(index);
  }

  getBarText(index: number) {
    switch (index) {
      case 1:
        return 'A comunidade';
      case 2:
        return 'Participar';
      case 3:
        return 'O que são gráficos táteis?';
      case 4:
        return 'A equipe';
      default:
        return '';
    }
  }
  
  getContent(index: number) {
    switch (index) {
      case 1:
        return 'A comunidade Palp-it se propõe a compartilhar, por meio de uma comunidade virtual, o acesso aos gráficos táteis, isso com a finalidade de contribuir ao aperfeiçoamento da educação de alunos com deficiência visual. Palp-it permite que educadores empenhados na produção desses materiais possam compartilhar o conhecimento e o esforço, facilitando o uso e reuso dos gráficos táteis em sala de aula.';
      case 2:
        return 'Se você já tem experiência com gráficos táteis, te convidamos a contribuir com uma educação mais igualitária! Compartilhe seu trabalho!\n\nSe você ainda não possui os recursos para produção dos gráficos táteis, não fique de fora! Te convocamos a explorar o conteúdo da nossa comunidade e levar para sua sala de aula material de alta qualidade para a formação dos seus alunos com deficiência visual!';
      case 3:
        return 'Você já parou para pensar como uma pessoa com deficiência visual pode explorar imagens, gráficos, fluxogramas que exigem muito da visão?\n\nPois bem, este é o papel dos gráficos táteis! São desenhos em relevo impressos por impressoras braille. Através da produção desses materiais é possível que as pessoas com deficiência visual façam a exploração de uma representação visual utilizando o tato, semelhantemente ao Braille. Os gráficos táteis precisam ser utilizados no ensino dos alunos com deficiência visual, pois promovem maior participação dos alunos no processo de ensino-aprendizagem.';
      case 4:
        return 'Conteúdo da Barra 4';
      default:
        return '';
    }
  }  

  fecharModal(){
    this.modalService.fecharModalInfo();
    this.renderer.removeClass(document.body, 'modal-open');
  }
}

