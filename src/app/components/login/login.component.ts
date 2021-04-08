import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/iusers';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

//responsabiltà dei componenti di occuparsi dei reindirizzamento verso le altre componenti (url). !imp.
export class LoginComponent implements OnInit {

  error : boolean = false;
  form : FormGroup ;
  

  constructor(private router:Router,private formBuilder : FormBuilder,private serviceU:UsersServiceService) { }

  ngOnInit(): void {

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

        this.serviceU.login(this.form.get('username')?.value,this.form.get('password')?.value).
        subscribe((result:User)=>{
          if (result)this.router.navigate(["/home"]);
        });
      
    }
  }

}
