import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent {
  codigo: string = '';
  constructor(private http: HttpClient,
            private userService: UsuarioService,
            private router: Router
            ){
  }

  ngOnInit(){
    this.codigo = this.userService.usuario.codigo;
  }

  reconstruirProfileComponent() {
    this.router.navigateByUrl('/perfil', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/perfil']);
    });
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

      this.http.post(`http://localhost:8080/upload/${this.codigo}`, formData).subscribe(
        (response: any) => {
          alert('Upload concluído');
          this.reconstruirProfileComponent();
        },
        (error: any) => {
          console.error('Upload error', error);
          // Lide com o erro, se necessário
        }
      );
    }
  }  
}