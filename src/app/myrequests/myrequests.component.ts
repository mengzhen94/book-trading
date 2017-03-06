import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myrequests',
  templateUrl: './myrequests.component.html',
  styleUrls: ['./myrequests.component.css'],
  providers: [BookService, RequestService]
})
export class MyrequestComponent implements OnInit {

  requests:[any]

  constructor(
    private bookService:BookService,
    private requestService:RequestService,
    private router: Router,
  ) { }


  showMyrequests(){
        this.requestService.getMyRequests()
            .subscribe(requests => {
                if(requests.length){
                    this.requests = requests;
                }
            })
    }

  ngOnInit() {
      this.showMyrequests();
  }

}
