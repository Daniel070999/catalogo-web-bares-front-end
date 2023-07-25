import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { BarMainComponent } from './barfolder/bar-main/bar-main.component';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './loginfolder/login/login.component';
import { BarMainMenuComponent } from './barfolder/bar-main-menu/bar-main-menu.component';
import { BarMainPromotionsComponent } from './barfolder/bar-main-promotions/bar-main-promotions.component';
import { BarMainEventsComponent } from './barfolder/bar-main-events/bar-main-events.component';
import { HomeAdminComponent } from './adminfolder/home-admin/home-admin.component';
import { NavbarAdminComponent } from './adminfolder/navbar-admin/navbar-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    BottomSheetComponent,
    BarMainComponent,
    BarMainMenuComponent,
    BarMainPromotionsComponent,
    BarMainEventsComponent,
    LoginComponent,
    HomeAdminComponent,
    NavbarAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    FormsModule,
    MatGridListModule,
    MatBottomSheetModule,
    MatListModule,
    MatTabsModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
