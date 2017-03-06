import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'hammerjs';
import { MaterialModule } from '@angular/material';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignUpComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { BookComponent } from './book/book.component';
import { MybookModule } from './mybook/mybook.module';
import { MyrequestComponent } from './myrequests/myrequests.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignUpComponent,
    LoginComponent,
    SettingsComponent,
    BookComponent,
    MyrequestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AppRoutingModule,
    MybookModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
