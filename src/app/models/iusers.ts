
export interface DataUs {

    name : string;
    surname : string ;
    dateOfBirthay :Date;
    birthPlace : Date;
    fiscalCode : string;
    phone : string;
    email : string;
    address : string;
    ibanCode : string ;
    userType : string;
}


export interface User {
    username : string;
    password : string ;
    userData : DataUs;
}