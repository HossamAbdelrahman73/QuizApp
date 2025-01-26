import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { ViewEditDialogComponent } from './components/view-edit-dialog/view-edit-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { DescriptionPipe } from '../features/dashboard/modules/instructor/modules/quizes/modules/question-bank/pipes/description.pipe';
@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    DeleteDialogComponent,
    ViewEditDialogComponent,
    HomeComponent,
    NotFoundComponent,
    BreadcrumbComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    NavbarComponent,
    SidebarComponent,
    NgxPaginationModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    BreadcrumbComponent,
    MatListModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
})
export class SharedModule {}
