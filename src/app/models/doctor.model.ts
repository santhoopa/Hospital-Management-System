import { TimeSlot } from './timeslot.model';

export interface Doctor{
  doctorRegistrationNumber:  string;
  name:{
  firstname:string;
  lastname:string;
  },
  gender:string;
  dob:any;
  address:string;
  city:string;
  district:string;
  nic:string;
  maritalStatus:string;
  contactNumber:Number;
  email:string;
  doctorType:string;
  SLMCRegNo:Number;
  primaryQualification:{
    degree:string;
    year:Number;
    university:string;
    country:string;
  },
  postGradQualification:{
    degree:string;
    specialization:string;
    year:Number;
    university:string;
    country:string;
  },
  doctorAvailability:TimeSlot[]
}
