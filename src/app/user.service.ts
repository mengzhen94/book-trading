import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions} from '@angular/http';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(
        private http: Http,
        private mdSnackBar: MdSnackBar,
    ) { }

    register(form){
        let url = `/api/signup`;
        let body = JSON.stringify(form);
        let headers = new Headers({'Content-Type':'application/json'});
        let reqOptions = new RequestOptions({headers:headers});

        return this.http.post(url,body,reqOptions).map(res => res);
    }

    login(form){
        let url = `/api/login`;
        let body = JSON.stringify(form);
        let headers = new Headers({'Content-Type':'application/json'});
        let reqOptions = new RequestOptions({headers:headers});

        return this.http.post(url,body,reqOptions).map(res => res);
    }

    logout(){
        let url = `/api/logout`;
        let body = JSON.stringify({});
        let headers = new Headers({'Content-Type':'application/json'});
        let reqOptions = new RequestOptions({headers:headers});

        return this.http.post(url,body,reqOptions).map(res => res);
    }

    getProfile(){
        let url = `/api/profile`;
        return this.http.get(url).map(res => res.json());
    }


    changeProfile(form){
        let url = `/api/changeProfile`;
        let body = JSON.stringify(form);
        let headers = new Headers({'Content-Type':'application/json'});
        let reqOptions = new RequestOptions({headers:headers});

        return this.http.post(url,body,reqOptions).map(res => res);
    }

     changePassword(form){
        let url = `/api/changePassword`;
        let body = JSON.stringify(form);
        let headers = new Headers({'Content-Type':'application/json'});
        let reqOptions = new RequestOptions({headers:headers});

        return this.http.post(url,body,reqOptions).map(res => res);
    }


    openSnackBar(message:string){
        let config = new MdSnackBarConfig();
        config.duration = 3000;
        this.mdSnackBar.open(message,'OK', config);
    }


}