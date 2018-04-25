import { DataService } from './../../services/data.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthModel } from './auth.model';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AppComponent } from '../../../app.component';


@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  model: AuthModel = new AuthModel();

  isAuthenticated: boolean = this._dataService.isAuthenticated();

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private _dataService: DataService) {}


  loginModal(loginModalTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(loginModalTemplate);
  }

  registerModal(registerModalTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(registerModalTemplate);
  }

  submitLogin(loginForm) {
    this._dataService.login(this.model);
    this._dataService.getApplicantInfo();
    this.isAuthenticated = true; // this should be a subscribe to changes on data service
    this.modalRef.hide();
  }

  submitRegister(registerForm) {
    this._dataService.register(this.model);
    this.modalRef.hide();
  }

  logout() {
    console.log('logout');
    this._dataService.logout();
    this.isAuthenticated = false;  // this should be a subscribe to changes on data service
  }

  goProfile() {
    console.log('goProfile');
    this._dataService.logout();
  }

  ngOnInit() {
  }

}
