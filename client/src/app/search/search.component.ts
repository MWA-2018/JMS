import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { animate, state, style, transition, trigger } from '@angular/animations';

import {MatPaginator, MatTableModule, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'jmsapp-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
 
  jobs = JOBS;

  constructor() { }

  ngOnInit() {
  }

  expandJob(event) {
    // console.log(this.jobsTr);
    let job_id = event.currentTarget.id;
    let job_detail_element = event.srcElement.parentElement.nextElementSibling.nextElementSibling;
    if (job_detail_element.style.display == 'block')
      job_detail_element.style.display = 'none';
    else
      job_detail_element.style.display = 'block';
    console.log(job_detail_element);
    console.log(job_detail_element.style.display);
  }

  applyJob(event) {
    alert("Go to Register or User profile page.");
  }



}

export interface JobPosition {
  id: number;
  title: string;
  company: String;
  tags: String;
}

const JOBS: JobPosition[] = [{ id: 1, title: "Data Engineering", company: "Citadel", tags: "Python R" },
  { id: 2, title: "Data Scientist", company: "BOA", tags: "Matlab Hadoop" },
  ];