import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class F5Service {
  constructor(private router: Router) {}

  disableF5AndRedirectToHome(): void {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'F5') {
        e.preventDefault();
        this.router.navigate(['/']); // Redirecionar para a página inicial (home)
      }
    });
  }
}
