import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppInfoComponent } from './app-info/app-info.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { AddUserComponent } from './add-user/add-user.component';
import { FormsModule } from '@angular/forms';
import { EditUserComponent } from './edit-user/edit-user.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { UserListingService } from './user-listing/user-listing.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AppInfoComponent,
    UserListingComponent,
    AddUserComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Ng2OrderModule,
    NgxPaginationModule,
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [UserListingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
