import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent  implements OnInit {

  auth:boolean = false;

  constructor(
    private router:Router,
    //private userService:UserService
    ) { }

    ngOnInit() {
    }
  
}
