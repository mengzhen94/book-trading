import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    providers: [UserService]
})

export class SignUpComponent {

    constructor(
        private userService:UserService,
        private router:Router
    ) { }

    signup(form) {
        
        this.userService.register(form)
            .subscribe(result=>{
                //this.router.navigateByUrl('books');
            },error=>{
            });
    }

}