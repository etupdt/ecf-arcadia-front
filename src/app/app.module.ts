import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HabitatCardComponent } from './pages/components/habitat-card/habitat-card.component';
import { ServiceCardComponent } from './pages/components/service-card/service-card.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewComponentComponent } from './pages/components/view-component/view-component.component';
import { ViewFormComponent } from './pages/components/view-form/view-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HabitatCardComponent,
    ServiceCardComponent,
    ViewComponentComponent,
    ViewFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
