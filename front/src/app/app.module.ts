import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {ROUTING} from './app.routing';
import {AuthModule} from "./BaseModules/auth/Auth.module";
import {TokenService} from "./Services/token.service";
import {MapModule} from "./AppModules/Map/map.module";
import {AuthorizationModule} from "./AppModules/Auth/auth.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AboutModule} from "./AppModules/About/about.module";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    ROUTING,

    AuthorizationModule,
    AuthModule,
    MapModule,
    AboutModule
  ],

  declarations: [
    AppComponent
  ],

  providers: [
    TokenService
  ],

  bootstrap: [
    AppComponent
  ]
})


export class AppModule {

  constructor() {}
}
