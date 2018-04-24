import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  imports: [
    BrowserModule,
    AccordionModule.forRoot()
  ],
  declarations: [SearchComponent],
  exports: [SearchComponent]
})
export class SearchModule { }
