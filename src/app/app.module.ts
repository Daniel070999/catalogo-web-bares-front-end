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
import { NewMenuComponent } from './adminfolder/new-menu/new-menu.component';
import { HomeRootComponent } from './rootfolder/home-root/home-root.component';
import { AdminBarRootComponent } from './rootfolder/admin-bar-root/admin-bar-root.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import {CdkMenuModule} from '@angular/cdk/menu';
import { CreateBarComponent } from './rootfolder/create-bar/create-bar.component';
import { NewPromotionComponent } from './adminfolder/new-promotion/new-promotion.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NewEventComponent } from './adminfolder/new-event/new-event.component';
import { ViewMenuComponent } from './adminfolder/view-menu/view-menu.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ViewImageComponent } from './view-image/view-image.component';
import { ViewPromotionComponent } from './adminfolder/view-promotion/view-promotion.component';
import { ViewBarComponent } from './rootfolder/view-bar/view-bar.component';


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
    NewMenuComponent,
    HomeRootComponent,
    AdminBarRootComponent,
    CreateBarComponent,
    NewPromotionComponent,
    NewEventComponent,
    ViewMenuComponent,
    ViewImageComponent,
    ViewPromotionComponent,
    ViewBarComponent
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
    MatToolbarModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    ScrollingModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatExpansionModule,
    CdkMenuModule,
    NgxMaterialTimepickerModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
