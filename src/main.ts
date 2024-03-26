import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { HomePageComponent } from './app/pages/home-page/home-page.component';
import { ViewService } from './app/services/view.service';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(FormsModule, ReactiveFormsModule),
        provideHttpClient(withInterceptorsFromDi()),
//        provideHttpClient(),
        provideRouter([
            {
                path: '',
                component: HomePageComponent
            }            
        ]),
        {provide: ViewService, useClass: ViewService},
    ]
})
  .catch(err => console.error(err));
