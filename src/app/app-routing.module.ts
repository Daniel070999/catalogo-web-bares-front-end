import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BarMainComponent } from './barfolder/bar-main/bar-main.component';
import { LoginComponent } from './loginfolder/login/login.component';
import { HomeAdminComponent } from './adminfolder/home-admin/home-admin.component';
import { AuthGuard } from './guards/auth.guard';
import { NewMenuComponent } from './adminfolder/new-menu/new-menu.component';
import { HomeRootComponent } from './rootfolder/home-root/home-root.component';
import { AdminBarRootComponent } from './rootfolder/admin-bar-root/admin-bar-root.component';
import { CreateBarComponent } from './rootfolder/create-bar/create-bar.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'bar/:id', component: BarMainComponent, canActivate: [AuthGuard] },
  { path: 'newmenu', component: NewMenuComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: HomeAdminComponent, canActivate: [AuthGuard] },
  { path: 'root', component: HomeRootComponent, canActivate: [AuthGuard] },
  { path: 'adminbar', component: AdminBarRootComponent, canActivate: [AuthGuard] },
  { path: 'createbar', component: CreateBarComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
