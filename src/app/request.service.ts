import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions} from '@angular/http';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import 'rxjs/add/operator/map';

@Injectable()
export class RequestService {

    constructor(
        private http: Http,
        private mdSnackBar: MdSnackBar,
    ) { }

    requestBook(book){
        let url = `/api/request/addrequest`;
        let body = JSON.stringify(book);
        let headers = new Headers({'Content-Type':'application/json'});
        let reqOptions = new RequestOptions({headers:headers});

        return this.http.post(url,body,reqOptions).map(res => res);
    }

    getMyRequests(){
        let url = `/api/request`;
        return this.http.get(url).map(res => res.json()); 
    }

    deleteMyRequest(request){
        let url = `/api/request/reletemyrequest`;
        let body = JSON.stringify(request);
        let headers = new Headers({'Content-Type':'application/json'});
        let reqOptions = new RequestOptions({headers:headers});

        return this.http.post(url,body,reqOptions).map(res => res);
    }

    getRequeststoMe(){
        let url = `/api/requestToMe`;
        return this.http.get(url).map(res => res.json()); 
    }

    apprRequeststoMe(request){
        let url = `/api/request/apprequest`;
        let body = JSON.stringify(request);
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