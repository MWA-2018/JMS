import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'jmsapp-update-recruiter',
  templateUrl: './update-recruiter.component.html',
  styleUrls: ['./update-recruiter.component.css']
})
export class UpdateRecruiterComponent implements OnInit {

  name:string;
  address: string;
  contact:string;
  userWebLink:string;
  email:string;
  fullImagePath:string;

  selectedFile:File = null;
  constructor(private _dataService: DataService) { 
    this.fullImagePath = "/assets/images/profile.png";
  }

  ngOnInit() {
  }

  onSubmit(){
    // const fd = new FormData();
    // fd.append('image',this.selectedFile,this.selectedFile.name); 
    let body = {
      name: this.name,
      address: this.address,
      contact: this.contact,
      webLink: this.userWebLink,
      email: this.email,
      logoURL:""
    };
    // this._dataService.createRecruiter(body);
    this._dataService.updateRecruiter(body);
  }
  
  getImage(event){
    // console.log(event);
    // this.selectedFile = event.target.files[0];
  }
}
