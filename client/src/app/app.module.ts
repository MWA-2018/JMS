import { ApplicantModule } from './applicant/applicant.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { DataService } from './core/services/data.service';

import { SearchComponent } from './search/search.component';
import { MatTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    ApplicantModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
