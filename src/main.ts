/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { InjectionToken, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { HomePageComponent } from './app/pages/home-page/home-page.component';
import { ViewService } from './app/services/view.service';
import { ServicesPageComponent } from './app/pages/services-page/services-page.component';
import { HabitatsPageComponent } from './app/pages/habitats-page/habitats-page.component';
import { EmployeePageComponent } from './app/pages/employee-page/employee-page.component';
import { DatePipe } from '@angular/common';
import { CrudPageComponent } from './app/pages/crud-page/crud-page.component';
import { ServiceService } from './app/services/service.service';
import { ItemsService } from './app/services/items.service';
import { ServiceCardComponent } from './app/pages/components/service-card/service-card.component';
import { ServiceFormComponent } from './app/pages/components/service-form/service-form.component';

const SERVICE = new InjectionToken<string>('ServiceService');

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(ReactiveFormsModule),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([
            {
                path: '',
                component: HomePageComponent
            },            
            {
                path: 'Accueil',
                component: HomePageComponent
            },            
            {
                path: 'Services',
                component: ServicesPageComponent
            },            
            {
                path: 'Habitats',
                component: HabitatsPageComponent
            },            
            {
                path: 'Employé',
                component: EmployeePageComponent,
            },            
            {
                path: 'Services2',
                component: CrudPageComponent,
                children: [
                    {
                        path: 'sub/:id',
                        component: ServiceFormComponent,
                        outlet: 'sub',
                        data: { requiredService: SERVICE }
                    },            
                ],
                data: {
                    feature: 'services',
                    fields: ['id', 'name', 'description'],
                    requiredService: SERVICE
                }            
            },            
        ]),
        {provide: ViewService, useClass: ViewService},
        DatePipe,
        {
            provide: SERVICE,
            useClass: ItemsService
        }         
    ]
})
  .catch(err => console.error(err));
