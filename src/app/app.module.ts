import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OldInterceptor } from './interceptors/old.interceptor';

@NgModule({
  declarations: [
    // your components and directives
  ],
  imports: [
    HttpClientModule,
    // other modules
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OldInterceptor,
      multi: true,
    },
    // other services and providers
  ],
  bootstrap: [
    // your main component
  ],
})
export class AppModule {}