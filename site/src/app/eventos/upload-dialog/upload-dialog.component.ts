import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'environment';

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent {
  private readonly apiURL = environment.apiURL;
  private readonly pathLogin = environment.pathLogin;
  private readonly pathUpload = environment.pathAttFoto;

  codigo: string = '';
  email: string = '';
  senha: string = ''

  constructor(private http: HttpClient,
              private userService: UsuarioService,
            ){
  }

  ngOnInit(){
    this.codigo = this.userService.usuario.codigo;
    this.email = this.userService.usuario.email;
    this.senha = this.userService.usuario.senha;
  }

  atualizarDados(){
    
    this.http.get(`${this.apiURL}/${this.pathLogin}?email=${this.email}&senha=${this.senha}`)
    .subscribe(
        (data: any) => {
          const usuario = {
            codigo: data.codigo,
            foto: data.foto,
            nome: data.nome,
            usuario: data.usuario,
            email: data.email,
            senha: data.senha,
            sobre: data.sobre,
            cidade: data.cidade
          };
          this.userService.setUsuario(usuario);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
            alert(error.status);
        } else {
          alert(error.status);
        }
      }
    );
    
  }
  openFileSelector(): void {

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', (event: Event) => this.handleFileSelection(event));
    input.click();
  }
  
  handleFileSelection(event: Event): void {

    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const formData: FormData = new FormData();
      formData.append('file', file);

      this.http.post(`${this.apiURL}/${this.pathUpload}/${this.codigo}`, formData).subscribe(
        (response: any) => {
          alert('Upload concluído');
          this.atualizarDados();
        },
        (error: HttpErrorResponse) => {
          if (error.status == 200){
            alert('Upload concluído');
            this.atualizarDados();
          }else{
            alert('Upload error ' + error.status);
          }

        }
      );

    }
  }  
}