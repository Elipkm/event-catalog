import { Routes } from '@angular/router';
import { KatalogMainViewComponent } from './components/katalog-main-view/katalog-main-view.component';
import { HomeComponent } from './components/home/home.component';
import { QuellenOverviewComponent } from './components/quellen-overview/quellen-overview.component';
import { QuelleFormComponent } from './components/quelle-form/quelle-form.component';

export const routes: Routes = [
    { path: "katalog", component: KatalogMainViewComponent },
    { path: "home", component: HomeComponent },
    { path: "quellen", component: QuellenOverviewComponent },
    { path: "", redirectTo: "home", pathMatch: "full" }
];
