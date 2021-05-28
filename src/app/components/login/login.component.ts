import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/iusers';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

//responsabiltà dei componenti di occuparsi dei reindirizzamento verso le altre componenti (url). !imp.
export class LoginComponent implements OnInit {

  form : FormGroup ;
  

  constructor(private localstorage : LocalstorageService,private _snackBar: MatSnackBar,private router:Router,private formBuilder : FormBuilder,private serviceU:UsersServiceService) { }

  ngOnInit(): void {

    if(this.localstorage.get("token-wrapper")){
      this.router.navigate(["/home"]);
    }
    this.buildFormOne();

  }

  public buildFormOne() {
    
    this.form = this.formBuilder.group({
      username: ['',[Validators.required,Validators.minLength(3)]],
      password : ['',Validators.required]
      });
     
   
  }

  submit() {
    console.log("sono dentro il submit , sto per inviare i dati")
    if (this.form.valid) {

        this.serviceU.login(this.form.get('username').value,this.form.get('password').value).
        subscribe((result:any)=>{
            this.router.navigate(["/home"]);
          
        },error => {
          console.log(error);
          this.errorClassificated(error);
          
        });
    }
  }

  openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
      duration: 2000,
      
    });
  }
  

  errorClassificated(error){
    if(error.status == 401 || error.status == 404) {
      this.openSnackBar("username e password sbagliati","Ok");
    }
    else {
      this.openSnackBar(error.statusText,"Ok");
    }
  }

}
