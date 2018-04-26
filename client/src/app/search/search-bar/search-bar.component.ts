import { Component, OnInit, Renderer2 } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { DataService } from '../../core/services/data.service';
import { CHECKBOX_CONTROL_VALUE_ACCESSOR } from 'ngx-bootstrap/buttons/button-checkbox.directive';
import { JobPosition } from '../../shared/models/jobPosition';
import { toArray } from 'rxjs/operator/toArray';
import { Router } from '@angular/router';


@Component({
  selector: 'jmsapp-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  bkgnd: Object = { bkgnd: true, shadow: true };
  searchbar: Object = { 'row': true, 'search-bar': true };
  searchinput: Object = { 'form-input': true, 'search-input': true };
  suggestions: string[] = [];
  searchBarMini: boolean;

  ngOnInit() {
    this._dataService.getJobPosition();
    this._dataService.jobPosition.subscribe((response: JobPosition[]) => {
      if (response.length > 0 && response) {
        this.suggestions = [];
        this.suggestions = Array.from(new Set(response.map(job => job.title)));
      } else {
        this.suggestions.push('no suggestion right now!');
      }
    }, console.error, () => console.log("Initial the search suggestion sccessed! "));
    if (this._dataService.isAuthenticated) {
      this._dataService.setSearchBarMini(true);
    } else {
      this._dataService.setSearchBarMini(false);      
    }
    this._dataService.searchBarMini.subscribe((flag: boolean) => {
      // Move the search bar to the top left corner
      if (flag) {
        this.searchbar = {
          'row': true, 'search-bar': true, 'fold': true
        };
        this.searchinput = { 'form-input': true, 'search-input': true, 'fold': true };
        // Hide the backgroud image
        this.bkgnd = { 'bkgnd': true, 'shadow': true, 'fold': true };
      } else {
        this.searchbar = { 'row': true, 'search-bar': true };
        this.searchinput = { 'form-input': true, 'search-input': true };
        // Hide the backgroud image
        this.bkgnd = { 'bkgnd': true, 'shadow': true };
      }
    })
  }

  asyncSelected: string;
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  dataSource: Observable<any>;

  constructor(private _dataService: DataService, private _router: Router) {
    this.dataSource = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.asyncSelected);
    }).mergeMap((token: string) => this.getStatesAsObservable(token));
  }

  getStatesAsObservable(token: string): Observable<any> {
    let query = new RegExp(token, 'ig');

    return Observable.of(
      this.suggestions.filter((title: string) => {
        console.log(title);
        return query.test(title);
      })
    );
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    console.log('Selected value: ', e.value);
  }

  onSearch(event) {
    if (this.asyncSelected) {
      console.log("searching.....");
      this._dataService.searchJobPosResault('title=' + this.asyncSelected);
    } else {
      console.log("getting......");
      this._dataService.getJobPosResault();
    }
    this._dataService.setSearchBarMini(true);
    this._router.navigate(['/jms/search']);
  }
}


