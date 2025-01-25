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
import { MatIconModule } from '@angular/material/icon'
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    DeleteDialogComponent,
    ViewEditDialogComponent,
    HomeComponent,
    NotFoundComponent,
    BreadcrumbComponent
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
    MatListModule
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
    BreadcrumbComponent
  ],
})
export class SharedModule { }
