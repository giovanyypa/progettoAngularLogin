import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private serviceU : UsersServiceService ,private  router:Router) { }

  ngOnInit(): void {


  }

  logout(){

    this.serviceU.logout();
    this.router.navigate(["/login"]);
    
  }

}
