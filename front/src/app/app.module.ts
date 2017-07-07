import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {WrapperComponent} from "./Components/Wrapper/wrapper.component";
import {AppStateModule} from "./BaseModules/app-state/app-state.module";
import {ROUTING} from './app.routing';
import {AuthModule} from "./BaseModules/auth/Auth.module";
import {TokenService} from "./Services/token.service";
import {MapModule} from "./AppModules/Map/map.module";
import {AppState} from "./BaseModules/app-state/app-state.service";
import {AuthorizationModule} from "./AppModules/Auth/auth.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    AppStateModule,
    BrowserModule,
    HttpModule,
    ROUTING,

    AuthorizationModule,
    AuthModule,
    MapModule
  ],

  declarations: [
    AppComponent,
    WrapperComponent
  ],

  providers: [
    TokenService
  ],

  bootstrap: [
    AppComponent
  ]
})


export class AppModule {

  constructor(
      private appState : AppState,
      private token    : TokenService
  ) {
    this.makeReady();
  }

  makeReady(){
    if(this.token.getToken()) {
    } else {
      this.appState.makeReady();
    }
  }
}
