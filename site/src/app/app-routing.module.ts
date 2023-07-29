import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { EnvioComponent } from './envio/envio.component';
import { GraficoComponent } from './grafico/grafico.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Palpit' }
  },
  {
      path: 'home',
      component: HomeComponent,
      data: { title: 'Palpit' }
  },
  {
      path: 'perfil',
      component: ProfileComponent,
      data: { title: 'Palpit' }
  },
  {
      path: 'favoritos',
      component: FavoriteComponent,
      data: { title: 'Palpit' }
  },
  {
      path: 'envio',
      component: EnvioComponent,
      data: { title: 'Palpit' }
  },
  {
      path: 'grafico/:id', 
      component: GraficoComponent,
      data: { title: 'Palpit' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
