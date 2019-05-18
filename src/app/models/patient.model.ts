export interface Patient{
  patientRegistrationNumber:  string;
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
  guardian:{
    guardianType:string;
    firstname:string;
    lastname:string;
    gender:string;
    NIC:string;
    contactNumber: Number;
  }
}
