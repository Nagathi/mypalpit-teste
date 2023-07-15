import { Component } from '@angular/core';
import { ModalResponseService } from 'src/app/services/modal-response.service';

@Component({
  selector: 'app-modal-response',
  templateUrl: './modal-response.component.html',
  styleUrls: ['./modal-response.component.css']
})
export class ModalResponseComponent{
  mensagem: string = '';
  modalAberto: boolean = false;

  constructor(private modalResponseService: ModalResponseService) { }

  ngOnInit() {
      this.modalResponseService.modalAbertoResponse$.subscribe(aberto => {
      this.modalAberto = aberto;
    });

    this.modalResponseService.mensagem$.subscribe(mensagem => {
      this.mensagem = mensagem;
    });
  }

  fecharModal() {
    this.modalResponseService.fecharModalResponse();
  }
}
