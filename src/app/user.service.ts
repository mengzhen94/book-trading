import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions} from '@angular/http';


import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) { }

    register(form){
        let url = `/api/signup`;
        let body = JSON.stringify(form);
        let headers = new Headers({'Content-Type':'application/json'});
        let reqOptions = new RequestOptions({headers:headers});

        console.log('user service /api/signup!!!');

        return this.http.post(url,body,reqOptions).map(res => res);
    }

}