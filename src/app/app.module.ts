import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HabitatCardComponent } from './pages/components/habitat-card/habitat-card.component';
import { ServiceCardComponent } from './pages/components/service-card/service-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HabitatCardComponent,
    ServiceCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
