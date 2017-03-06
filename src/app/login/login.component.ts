import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AppComponent } from '../app.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [UserService]
})

export class LoginComponent {

    constructor(
        private appComponent:AppComponent,
        private userService:UserService,
        private router:Router,
    ) { }

    login(form) {
        this.userService.login(form)
            .subscribe(result=>{
                this.userService.openSnackBar(`Successfully Login!`);
                this.router.navigateByUrl('/books', { skipLocationChange: true });
                this.appComponent.changeToAuth(true);
            },error=>{
                this.userService.openSnackBar(`${error.statusText}. Please Try Again`);
                this.appComponent.changeToAuth(false);
                
            });
    }

}