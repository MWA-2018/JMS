import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ApplicantModule } from './applicant/applicant.module';
import { DataService } from './core/services/data.service';
import { RecruiterModule } from './recruiter/recruiter.module';
import { SearchModule } from './search/search.module';
import { UpdateRecruiterComponent } from './recruiter/update-recruiter/update-recruiter.component';
import { RouterModule } from '@angular/router';

const MY_ROUTES = [
  {path:"", redirectTo: "AppComponent", pathMatch:"full"},
  {path:"updateRecruiter", component:UpdateRecruiterComponent}
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    ApplicantModule,
    RecruiterModule,
    SearchModule,
    RouterModule.forRoot(MY_ROUTES)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
