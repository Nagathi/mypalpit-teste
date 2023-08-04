import { Component } from '@angular/core';
import { F5Service } from './services/f5.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private f5Service: F5Service) {
  }
  ngOnInit() {
    this.f5Service.disableF5AndRedirectToHome();
  }
}
