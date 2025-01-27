import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './components/table/table.component';
import { MatSortModule } from '@angular/material/sort';
import { TruncatePipe } from './pipes/truncate.pipe';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    DeleteDialogComponent,
    ViewEditDialogComponent,
    HomeComponent,
    NotFoundComponent,
    BreadcrumbComponent,
    NotFoundComponent,
    TableComponent,
    TruncatePipe,
    BreadcrumbComponent,
    UpdateProfileComponent,
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
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    MatPaginatorModule
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
    MatListModule,
    BreadcrumbComponent,
    MatListModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BreadcrumbComponent,
    MatTableModule,
    TableComponent,
    FormsModule,
    MatPaginatorModule,
    TableComponent,
    MatIconModule,
  ],
  providers: [DatePipe, TruncatePipe],
})
export class SharedModule {}
