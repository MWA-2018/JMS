import { Address } from "../shared/models/address";
import { JobPosition } from "../shared/models/jobPosition";
import { AuthModel } from "../core/navigation/auth/auth.model";

/**
 * Created on: April 22, 2018
 * Model a recruiter
 * @author Rupendra MAHARJAN
 */
 export class Recruiter{ 
    // name: string;
    user: AuthModel;
     address: string;
     contact: string;
     email:string;
     webLink: string;
     logoURL: string;
     positions:JobPosition[];

     constructor(){
         this.user = new AuthModel();
         this.address = "";
         this.contact ='';
         this.email ='';
         this.webLink = '';
        //  this.logoURL='';
         this.positions=[];
     }
 }