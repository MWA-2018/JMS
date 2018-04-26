import { Applicant } from './../../shared/models/applicant';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UpdateApplicantInfoComponent } from '../update-applicant-info/update-applicant-info.component';
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'jmsapp-applicant-info',
  templateUrl: './applicant-info.component.html',
  styleUrls: ['./applicant-info.component.css']
})
export class ApplicantInfoComponent implements OnInit {
  @Input() applicant: Applicant;

  bsModalRef: BsModalRef;
  constructor(private _modalService: BsModalService, private _authService: AuthService) { }

  ngOnInit() {

  }

  onUpdate() {   
  
    const config = {
      // backdrop:'static',
      ignoreBackdropClick : true,
      class: 'modal-dialog-centered'
    }

    this.bsModalRef = this._modalService.show(UpdateApplicantInfoComponent,config);

    const decodedToken = this._authService.getDecodedToken();
    console.log(this.applicant);
    this.applicant.user_id = decodedToken._id;
    this.applicant.name = decodedToken.fullnames;
    this.bsModalRef.content.applicant = this.applicant;
    //this.bsModalRef.content.applic
    // this.applicant.email = decodedToken.email;
    // this.applicant.name = decodedToken.fullname;
    // this.applicant.applicant_id = decodedToken._id;
  }

}
