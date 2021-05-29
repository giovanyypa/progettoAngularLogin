import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataUs } from 'src/app/models/iusers';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userInfo:DataUs;
  constructor(private serviceU : UsersServiceService ,private  router:Router) { }

  ngOnInit(): void {

    this.serviceU.getDataUserWithToken().subscribe(
        (resp:DataUs) => this.userInfo = resp
    );

  }

  logout(){

    this.serviceU.logout();
    this.router.navigate(["/login"]);
    
  }

}
