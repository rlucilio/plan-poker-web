import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutBodyComponent } from './layout-body/layout-body.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';



@NgModule({
  declarations: [
    LayoutBodyComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
