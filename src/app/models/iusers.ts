import { RouteConfigLoadEnd } from "@angular/router";

export interface DataUs {
    

    firstname : string;
    lastname : string ;
    username : string ;
    password : string ;
    birthdate :Date;
    fiscalcode : string;
    citizenship : string;
    address : string;
    gender : String;
    role : Role;
}


export interface User {
    username : string;
    password : string ;
    userData : DataUs;
}

export interface Role {
    nome : string;
    descrizione : string;
}