import { AppliedPost } from './../../shared/models/appliedpost';
import { Applicant } from './../../shared/models/applicant';
import { Credentials } from './../../shared/models/credentials';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Recruiter } from '../../recruiter/recruiter';
//import { APP_CONFIG, HttpConfig } from '../../app-config/app-config.constants';
import { JobPosition } from '../../shared/models/jobPosition';
import { AuthService } from '../../auth/auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const url = "http://localhost:3000/api";

@Injectable()
export class DataService {

  private token = localStorage.getItem('jwt');

  private dataRepo: {
    applicant: AppliedPost,
    credentials: Credentials,
    jobPosition: JobPosition[],
    jobPosResault: JobPosition[],
    appliedJobPos: JobPosition[],
    recruiter: Recruiter,
    authenticated: boolean,
    searchBarMini: boolean
  };




  private _applicant: BehaviorSubject<AppliedPost>;
  public applicant: Observable<AppliedPost>;

  private _credentials: BehaviorSubject<Credentials>;
  public credentials: Observable<Credentials>;


  private _jobPosition: BehaviorSubject<JobPosition[]>;
  public jobPosition: Observable<JobPosition[]>;

  private _jobPosResault: BehaviorSubject<JobPosition[]>;
  public jobPosResault: Observable<JobPosition[]>;

  private _appliedJobPos: BehaviorSubject<JobPosition[]>;
  public appliedJobPos: Observable<JobPosition[]>;

  private _recruiter: BehaviorSubject<Recruiter>;
  public recruiter: Observable<Recruiter>;


  private _searchBarMini: BehaviorSubject<Boolean>;
  public searchBarMini: Observable<Boolean>;

  constructor(private _http: HttpClient, private _authService: AuthService) {
    this.dataRepo = {
      applicant: new AppliedPost,
      credentials: new Credentials,
      jobPosition: new Array<JobPosition>(),
      jobPosResault: new Array<JobPosition>(),
      appliedJobPos: new Array<JobPosition>(),
      recruiter: new Recruiter,
      authenticated: false,
      searchBarMini: false,
    };

    this._credentials = <BehaviorSubject<Credentials>>new BehaviorSubject(new Credentials);
    this.credentials = this._credentials.asObservable();

    this._applicant = <BehaviorSubject<AppliedPost>>new BehaviorSubject(new AppliedPost);
    this.applicant = this._applicant.asObservable();

    this._jobPosition = <BehaviorSubject<JobPosition[]>>new BehaviorSubject(new Array<JobPosition>());
    this.jobPosition = this._jobPosition.asObservable();

    this._jobPosResault = <BehaviorSubject<JobPosition[]>>new BehaviorSubject(new Array<JobPosition>());
    this.jobPosResault = this._jobPosResault.asObservable();

    this._appliedJobPos = <BehaviorSubject<JobPosition[]>>new BehaviorSubject(new Array<JobPosition>());
    this.appliedJobPos = this._appliedJobPos.asObservable();

    this._recruiter = <BehaviorSubject<Recruiter>>new BehaviorSubject(new Recruiter);
    this.recruiter = this._recruiter.asObservable();

    this._searchBarMini = <BehaviorSubject<Boolean>>new BehaviorSubject(new Boolean);
    this.searchBarMini = this._searchBarMini.asObservable();
  }

  getApplicantInfo() {

    if (this.token) {
      const options = {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}`, 'Content-Type': 'application/json' }, )
      };
      const decodedToken = this._authService.getDecodedToken();
      this._http.get(`${url}/applicant/info/${decodedToken._id}`, options)
        .subscribe((response: any) => {
          this.dataRepo.applicant.appliedpost = response.applications;
          this.dataRepo.applicant.applicant.address = response.address;
          this.dataRepo.applicant.applicant.applicant_id = response.applicant_id;
          this.dataRepo.applicant.applicant.dob = response.dob;
          this.dataRepo.applicant.applicant.email = response.email;
          this.dataRepo.applicant.applicant.liURL = response.liURL;
          this.dataRepo.applicant.applicant.name = response.name;
          this.dataRepo.applicant.applicant.phone = response.contact;
          this._applicant.next(Object.assign({}, this.dataRepo).applicant);
        });
    }
  }

  getAppliedJobPos(pos_id: string) {
    console.log(pos_id);
    this._http.get(url + "/jobPosition/search?_id=" + pos_id)
      .subscribe((response: JobPosition[]) => {
        this.dataRepo.appliedJobPos = response;
        this._appliedJobPos.next(Object.assign({}, this.dataRepo).appliedJobPos);
      });

    // this.dataRepo.appliedJobPos.push({ "_id": ObjectId("5adf89d05e4ecb3c4ca5fc01"), 
    //   "postDate": ISODate("2018-04-24T19:47:28.277Z"), "company": "Google", 
    //   "applicant_ids": [], "title": "MEAN Developer", 
    //   "description": "Java into the world again", 
    //   "tags": "abc, def", "status": "Open", "__v": 0 });
    // this._appliedJobPos.next(Object.assign({}, this.dataRepo).appliedJobPos);

  }

isAuthenticated() {
  return !!this.token;
}

setSearchBarMini(flag: boolean) {
  this.dataRepo.searchBarMini = flag;
  this._searchBarMini.next(Object.assign({}, this.dataRepo).searchBarMini);
}

login(credentials: any) {
  this._http.post(`${url}/auth/login`, credentials, httpOptions).subscribe(
    (response: Credentials) => {

      console.log({ response });

      localStorage.setItem('jwt', response.token);
      this.token = response.token;

      this.dataRepo.credentials = response;

      this.dataRepo.authenticated = true;

    },
    err => console.error('login error', err),
    () => {
      this._credentials.next(Object.assign({}, this.dataRepo).credentials);
    }
  );
}

logout() {
  localStorage.removeItem('jwt');
  this.token = null;
  this.dataRepo.authenticated = false;
}

register(user: any) {

  this._http.post(`${url}/auth/register`, user, httpOptions).subscribe(
    (response: Credentials) => {

      localStorage.setItem('jwt', response.token);
      this.token = response.token;

      this.dataRepo.credentials = response;
      this._credentials.next(Object.assign({}, this.dataRepo).credentials);

      this.dataRepo.authenticated = true;
    },
    err => console.error('register error', err)
  );
}


getJobPosition() {
  console.log('Getting all the job positions...');
  this._http.get(url + "/jobPosition").subscribe((response: JobPosition[]) => {
    console.log(response);
    this.dataRepo.jobPosition = response;
    this._jobPosition.next(Object.assign({}, this.dataRepo).jobPosition);
  }, err => { console.log(err) }, () => { console.log("Get job position done") });
}

getJobPosResault() {
  this._http.get(url + "/jobPosition")
    .subscribe((response: JobPosition[]) => {
      this.dataRepo.jobPosResault = response;
      this._jobPosResault.next(Object.assign({}, this.dataRepo).jobPosResault);
    });
}
searchJobPosResault(query: string) {
  this._http.get(url + "/jobPosition/search?" + query)
    .subscribe((response: JobPosition[]) => {
      this.dataRepo.jobPosResault = response;
      this._jobPosResault.next(Object.assign({}, this.dataRepo).jobPosResault);
    });
}

createNewJob(newJob) {
  let jsonBody = { newJob: newJob };
  let body = JSON.stringify(jsonBody);
  return this._http.post(url + "/jobPosition/create", body, httpOptions)
    .subscribe(
      result => console.log("New Position Created...", result),
      err => console.error(err),
      () => "Job Creation Operation Completed"
    );
}

getRecruiterInfo() {
  console.log('Inside Service');
  const token = localStorage.getItem('jwt');
  if (token) {
    const options = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    };

    this._http.get(`${url}/recruiter/info`, options)
      .subscribe((response: Recruiter) => {
        console.log("My response", response);
        this.dataRepo.recruiter = response;
        this._recruiter.next(Object.assign({}, this.dataRepo).recruiter);
      }, console.error, () => console.log('get recruiter info done'));
  }
}

createRecruiter(newRecruiter) {
  let body = JSON.stringify(newRecruiter);
  return this._http.post(url + "/recruiter/create", body, httpOptions).subscribe(
    result => {
      console.log("Creating Recruiter.....", result);
      return true;
    },
    err => {
      console.error(err)
    }
  );
}

updateApplicantInfo(applicantInfo) {

  if (this.token) {
    const options = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}`, 'Content-Type': 'application/json' })
    };
    let body = JSON.stringify(applicantInfo);
    return this._http.post(`${url}/applicant/update`, body, options);
  }
}

updateApplicantJobPos(pos_id: string) {
  let obj = { pos_id: pos_id };
  if (this.token) {
    const options = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}`, 'Content-Type': 'application/json' })
    };
    let body = JSON.stringify(obj);
    return this._http.post(`${url}/applicant/updatepositions`, body, options);
  }
}

updateRecruiter(updatedRecruiter) {
  let body = JSON.stringify(updatedRecruiter);
  return this._http.put(url + "/recruiter/update", body, httpOptions).subscribe(
    result => {
      console.log("Updating Recruiter ...", result);
      return true;
    },
    err => console.error(err)
  );
}
}
