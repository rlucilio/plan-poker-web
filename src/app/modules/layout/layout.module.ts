import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutHeaderComponent } from './layout-header/layout-header.component';
import { LayoutNavComponent } from './layout-nav/layout-nav.component';
import { LayoutFooterComponent } from './layout-footer/layout-footer.component';
import { LayoutBodyComponent } from './layout-body/layout-body.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';



@NgModule({
  declarations: [
    LayoutHeaderComponent,
    LayoutNavComponent,
    LayoutFooterComponent,
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
