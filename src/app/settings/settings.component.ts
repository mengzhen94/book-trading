import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AppComponent } from '../app.component';

@Component({
    selector: 'app-setting',
    templateUrl: './settings.component.html',
    providers: [UserService]
})

export class SettingsComponent implements OnInit {

    userProfile = {
        username:'',
        city: '',
        state: '',
    }

    constructor(
        private appComponent:AppComponent,
        private userService:UserService,
        private router:Router,
    ) { }

    getProfile(){
        this.userService.getProfile()
            .subscribe(result=>{
                console.log("settings result", result);
                Object.keys(result).forEach(key => {
                    this.userProfile[key] = result[key];
                })
            },error=>{
                this.userService.openSnackBar(`${error.statusText}. Please Try Again`);
            })
    }

    changeProfile(form) {
        this.userService.changeProfile(form)
            .subscribe(result=>{
                this.userService.openSnackBar(`Successfully Saved Profile!`);
                this.router.navigateByUrl('/profile');
            },error=>{
                this.userService.openSnackBar(`${error.statusText}. Please Try Again`);
            });
    }

    changePassword(form) {
        this.userService.changePassword(form)
            .subscribe(result=>{
                this.userService.logout()
                    .subscribe(result=>{
                        this.userService.openSnackBar(`Successfully Update Password!`);
                        this.router.navigateByUrl('login');
                        this.appComponent.changeToAuth(false);
                    })
            },
            error=>{
                if(error.status == 401) {
                    this.userService.openSnackBar('Wrong Password!!');
                }else{
                    this.userService.openSnackBar(`${error.statusText}. Please Try Again`);
                }
            });
    }


    ngOnInit() {
        this.getProfile();
    }

}