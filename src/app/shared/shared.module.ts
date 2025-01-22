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

@NgModule({
  declarations: [NavbarComponent, SidebarComponent, DeleteDialogComponent, ViewEditDialogComponent, HomeComponent, NotFoundComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    NavbarComponent,
    SidebarComponent,
  ],
})
export class SharedModule {}
