import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { ViewEditDialogComponent } from './components/view-edit-dialog/view-edit-dialog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    DeleteDialogComponent,
    ViewEditDialogComponent,
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
  ],
})
export class SharedModule { }
