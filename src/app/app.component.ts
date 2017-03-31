import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserService]
})
export class AppComponent  implements OnInit {

  auth:boolean = false;

  constructor(
    private router:Router,
    private userService:UserService
    ) { }

    changeToAuth(value:boolean) {
      this.auth = value;
    }

    logout() {
      this.userService.logout()
        .subscribe(result=>{
                this.userService.openSnackBar(`Successfully Logout!`);
                this.router.navigateByUrl('/books');
                this.changeToAuth(false);
            },error=>{
                this.userService.openSnackBar(`${error.statusText}. Please Try Again`);
                this.changeToAuth(true);
            });
    }

    ngOnInit() {
    }
  
}
