import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { FeedComponent } from './home/feed/feed.component';
import { ConsultaComponent } from './home/consulta/consulta.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { ModalCadastroComponent } from './modais/modal-cadastro/modal-cadastro.component';
import { ModalLoginComponent } from './modais/modal-login/modal-login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadDialogComponent } from './eventos/upload-dialog/upload-dialog.component';
import { ModalResponseComponent } from './modais/modal-response/modal-response.component';
import { ModalInfoComponent } from './modais/modal-info/modal-info.component';
import { ModalAlterarComponent } from './modais/modal-alterar/modal-alterar.component';
import { EnvioComponent } from './envio/envio.component';
import { GraficoComponent } from './grafico/grafico.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component'
import { F5Service } from './services/f5.service';

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
    UploadDialogComponent,
    ModalResponseComponent,
    ModalInfoComponent,
    ModalAlterarComponent,
    EnvioComponent,
    GraficoComponent,
    PesquisaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    F5Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
