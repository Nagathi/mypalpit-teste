import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FeedComponent } from './feed/feed.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { roteando } from './app.routing';
import { FavoriteComponent } from './favorite/favorite.component';
import { ModalCadastroComponent } from './modal-cadastro/modal-cadastro.component';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FeedComponent,
    ConsultaComponent,
    FooterComponent,
    HomeComponent,
    ProfileComponent,
    FavoriteComponent,
    ModalCadastroComponent,
    ModalLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    roteando,
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
