import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../core/services/data.service';
import { JobPosition } from '../../shared/models/jobPosition';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'jmsapp-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  private _temp: JobPosition[];
  @ViewChild('myTable') table: any;

  expanded: any = {};
  timeout: any;

  jobs: JobPosition[] = [];
  loading: boolean;
  isApply: boolean;
  constructor(private _dataService: DataService, private _authService: AuthService, private _router: Router) {
    if(this.jobs.length === 0) {
      this._dataService.getJobPosResault();
    }
    this._dataService.jobPosResault.subscribe((response: JobPosition[]) => {
      this.jobs = response;
      this._temp = response;
    });

    this.isApply = this._authService.isAuthenticated();
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  applyJob(event) {
    let srcElement = event.srcElement;
    let pos_id = srcElement.attributes.id.value;
    // let resault = this._dataService.updateApplicantJobPos(pos_id);
    // console.log(resault);
    this._dataService.getAppliedJobPos(pos_id);
    this._router.navigate(['jms/applicant']);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this._temp.filter(function (d) {
      console.log(d);
      return d.title.toLowerCase().indexOf(val) !== -1 || !val
        || d.company.toLowerCase().indexOf(val) !== -1;
    });

    // update the rows
    this.jobs = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}


