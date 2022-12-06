import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  // {path: '', redirectTo:'inicio',pathMatch:'full'},
  {path: 'inicio', component: InicioComponent},
  {path:'header', component: HeaderComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
