import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions} from '@angular/http';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class BookService {

    constructor(
        private http: Http,
    ) { }

    searchBook(title: string) {
        let url = `/api/book/search?keyword=${title}`;
        return this.http.get(url).map(res => res.json()); 
    }

}