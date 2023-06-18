import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { FavoriteComponent } from "./favorite/favorite.component";

const APP_ROUTES: Routes = [
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
];

export const roteando = RouterModule.forRoot(APP_ROUTES);