import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { FormWordsComponent, ResultTableComponent } from 'src/app/components';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ResultTableComponent,
    FormWordsComponent,
  ]
})
export class HomeModule { }
