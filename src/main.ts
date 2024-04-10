/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { InjectionToken, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
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
import { ViewsPageComponent } from './app/pages/views-page/views-page.component';
import { AnimalFormComponent } from './app/pages/components/animal-form/animal-form.component';
import { FoodAnimalPageComponent } from './app/pages/food-animal-page/food-animal-page.component';
import { ListComponent } from './app/pages/components/list/list.component';
import { AnimalFoodComponent } from './app/pages/components/animal-food/animal-food.component';
import { UserFormComponent } from './app/pages/components/user-form/user-form.component';
import { HoursFormComponent } from './app/pages/components/hours-form/hours-form.component';
import { HabitatFormComponent } from './app/pages/components/habitat-form/habitat-form.component';
import { AnimalReportComponent } from './app/pages/components/animal-report/animal-report.component';
import { ReportAnimalPageComponent } from './app/pages/report-animal-page/report-animal-page.component';
import { AnimalFoodListComponent } from './app/pages/components/animal-food-list/animal-food-list.component';
import { ReportsPageComponent } from './app/pages/reports-page/reports-page.component';

const SERVICE = new InjectionToken<string>('ServiceService');

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(ReactiveFormsModule, BrowserModule, FormsModule),
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
                path: 'Avis',
                component: ViewsPageComponent,
            },            
            {
                path: 'Reports',
                component: ReportsPageComponent,
            },            
            {
                path: 'ServicesAdmin',
                component: CrudPageComponent,
                data: {
                    feature: 'services',
                    requiredService: SERVICE
                },
                children: [
                    {
                        path: 'form',
                        component: ServiceFormComponent,
                        outlet: 'form',
                        data: { 
                            requiredService: SERVICE,
                        }
                    },            
                    {
                        path: 'list',
                        component: ListComponent,
                        outlet: 'list',
                        data: { 
                            requiredService: SERVICE,
                            feature: 'services',
                            fields: ['id', 'name', 'description'],
                        }
                    },            
                ],
            },            
            {
                path: 'UsersAdmin',
                component: CrudPageComponent,
                data: {
                    feature: 'users',
                    requiredService: SERVICE
                },
                children: [
                    {
                        path: 'form',
                        component: UserFormComponent,
                        outlet: 'form',
                        data: { 
                            requiredService: SERVICE,
                        }
                    },            
                    {
                        path: 'list',
                        component: ListComponent,
                        outlet: 'list',
                        data: { 
                            requiredService: SERVICE,
                            feature: 'users',
                            fields: ['id', 'username', 'firstname', 'lastname'],
                        }
                    },            
                ],
            },            
            {
                path: 'HoursAdmin',
                component: CrudPageComponent,
                data: {
                    feature: 'hours',
                    requiredService: SERVICE
                },
                children: [
                    {
                        path: 'form',
                        component: HoursFormComponent,
                        outlet: 'form',
                        data: { 
                            requiredService: SERVICE,
                        }
                    },            
                    {
                        path: 'list',
                        component: ListComponent,
                        outlet: 'list',
                        data: { 
                            requiredService: SERVICE,
                            feature: 'hours',
                            fields: ['id', 'monday', 'tuesday', 'wednesday'],
                        }
                    },            
                ],
            },            
            {
                path: 'HabitatsAdmin',
                component: CrudPageComponent,
                data: {
                    feature: 'habitats',
                    requiredService: SERVICE
                },
                children: [
                    {
                        path: 'form',
                        component: HabitatFormComponent,
                        outlet: 'form',
                        data: { 
                            requiredService: SERVICE,
                        }
                    },            
                    {
                        path: 'list',
                        component: ListComponent,
                        outlet: 'list',
                        data: { 
                            requiredService: SERVICE,
                            feature: 'habitats',
                            fields: ['id', 'name', "description"],
                        }
                    },            
                ],
            },            
            {
                path: 'AnimalsAdmin',
                component: CrudPageComponent,
                data: {
                    feature: 'animals',
                    requiredService: SERVICE
                },
                children: [
                    {
                        path: 'form',
                        component: AnimalFormComponent,
                        outlet: 'form',
                        data: { 
                            requiredService: SERVICE,
                        }
                    },            
                    {
                        path: 'list',
                        component: ListComponent,
                        outlet: 'list',
                        data: { 
                            requiredService: SERVICE,
                            feature: 'animals',
                            fields: ['id', 'firstname', "description"],
                        }
                    },            
                ],
            },            
            {
                path: 'FoodAnimalAdmin',
                component: FoodAnimalPageComponent,
                data: {
                    feature: 'foodanimals',
                    requiredService: SERVICE
                },
                children: [
                    {
                        path: 'form',
                        component: AnimalFoodComponent,
                        outlet: 'form',
                        data: { 
                            requiredService: SERVICE,
                        }
                    },            
                    {
                        path: 'list',
                        component: ListComponent,
                        outlet: 'list',
                        data: { 
                            requiredService: SERVICE,
                            feature: 'animals',
                            fields: ['id', 'firstname', "description"],
                        }
                    },            
                ],
            },            
            {
                path: 'ReportAnimalAdmin',
                component: ReportAnimalPageComponent,
                data: {
                    feature: 'veterinaryreports',
                    requiredService: SERVICE
                },
                children: [
                    {
                        path: 'form',
                        component: AnimalReportComponent,
                        outlet: 'form',
                        data: { 
                            requiredService: SERVICE,
                        }
                    },            
                    {
                        path: 'food',
                        component: AnimalFoodListComponent,
                        outlet: 'food',
                        data: { 
                            requiredService: SERVICE,
                        }
                    },            
                    {
                        path: 'list',
                        component: ListComponent,
                        outlet: 'list',
                        data: { 
                            requiredService: SERVICE,
                            feature: 'animals',
                            fields: ['id', 'firstname', "description"],
                        }
                    },            
                ],
            },            
        ]),
        {provide: ViewService, useClass: ViewService},
        DatePipe,
        { provide: SERVICE, useClass: ItemsService }         
    ]
})
  .catch(err => console.error(err));
