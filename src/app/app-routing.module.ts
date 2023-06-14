import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BarMainComponent } from './bar-main/bar-main.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'bar/:id', component: BarMainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
