/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { InjectionToken, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withRouterConfig } from '@angular/router';
import { HomePageComponent } from './app/pages/home-page/home-page.component';
import { ServicesPageComponent } from './app/pages/services-page/services-page.component';
import { HabitatsPageComponent } from './app/pages/habitats-page/habitats-page.component';
import { DatePipe } from '@angular/common';
import { CrudPageComponent } from './app/pages/crud-page/crud-page.component';
import { ItemsService } from './app/services/items.service';
import { ServiceFormComponent } from './app/components/service-form/service-form.component';
import { ViewsPageComponent } from './app/pages/views-page/views-page.component';
import { AnimalFormComponent } from './app/components/animal-form/animal-form.component';
import { FoodAnimalPageComponent } from './app/pages/food-animal-page/food-animal-page.component';
import { ListComponent } from './app/components/list/list.component';
import { AnimalFoodFormComponent } from './app/components/animal-food-form/animal-food-form.component';
import { UserFormComponent } from './app/components/user-form/user-form.component';
import { HoursFormComponent } from './app/components/hours-form/hours-form.component';
import { HabitatFormComponent } from './app/components/habitat-form/habitat-form.component';
import { AnimalReportFormComponent } from './app/components/animal-report-form/animal-report-form.component';
import { ReportAnimalPageComponent } from './app/pages/report-animal-page/report-animal-page.component';
import { AnimalFoodListComponent } from './app/components/animal-food-list/animal-food-list.component';
import { ReportsPageComponent } from './app/pages/reports-page/reports-page.component';
import { BreedFormComponent } from './app/components/breed-form/breed-form.component';
import { FoodFormComponent } from './app/components/food-form/food-form.component';
import { tokenInterceptor } from './app/interceptors/token.interceptor';
import { ErrorModalComponent } from './app/modals/error-modal/error-modal.component';
import { DashboardPageComponent } from './app/pages/dashboard-page/dashboard-page.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ContactPageComponent } from './app/pages/contact-page/contact-page.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OldInterceptor } from './app/interceptors/old.interceptor';

const SERVICE = new InjectionToken<string>('ServiceService');

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(ReactiveFormsModule, BrowserModule, FormsModule),
        provideHttpClient(withInterceptorsFromDi()),
        {provide: HTTP_INTERCEPTORS, useClass: OldInterceptor, multi: true},
        // provideHttpClient(withInterceptors([tokenInterceptor])),
        DatePipe,
        { provide: SERVICE, useClass: ItemsService },    
        provideCharts(withDefaultRegisterables()),
        NgbActiveModal,
        provideRouter([
            {
                path: 'error',
                component: ErrorModalComponent,
                outlet: 'modal',
            },            
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
                path: 'Contact',
                component: ContactPageComponent,
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
                            fields: ['id', 'name'],
                        }
                    },            
                ],
            },            
            {
                path: 'BreedsAdmin',
                component: CrudPageComponent,
                data: {
                    feature: 'breeds',
                    requiredService: SERVICE
                },
                children: [
                    {
                        path: 'form',
                        component: BreedFormComponent,
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
                            feature: 'breeds',
                            fields: ['id', 'label'],
                        }
                    },            
                ],
            },            
            {
                path: 'FoodsAdmin',
                component: CrudPageComponent,
                data: {
                    feature: 'foods',
                    requiredService: SERVICE
                },
                children: [
                    {
                        path: 'form',
                        component: FoodFormComponent,
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
                            feature: 'foods',
                            fields: ['id', 'name'],
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
                            fields: ['id', 'firstname', 'lastname', 'email'],
                        }
                    },            
                ],
            },            
            {
                path: 'DashboardAdmin',
                component: DashboardPageComponent,
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
                            fields: ['id', 'name'],
                        }
                    },            
                ],
            },            
            {
                path: 'HabitatsVeterinary',
                component: CrudPageComponent,
                data: {
                    feature: 'habitats/comment',
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
                            fields: ['id', 'name'],
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
                            fields: ['id', 'firstname'],
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
                        component: AnimalFoodFormComponent,
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
                            fields: ['id', 'firstname'],
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
                        component: AnimalReportFormComponent,
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
                            fields: ['id', 'firstname'],
                        }
                    },            
                ],
            },            
        ], withRouterConfig({
            onSameUrlNavigation: 'reload'
        })),
    ]
})
  .catch(err => console.error(err));
