import { GlobalInterceptor } from './core/interceptors/global/global.interceptor';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { NgxSpinnerModule } from 'ngx-spinner';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { loadingInterceptor } from './core/interceptors/loader/loading.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // NgxSpinnerModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'timer' }),
    HttpClientModule,
  ],
  providers: [
    provideHttpClient(withInterceptors([loadingInterceptor])),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalInterceptor,
      multi: true,
    },

    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
