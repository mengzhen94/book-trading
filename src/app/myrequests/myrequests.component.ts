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
            },error=>{
                this.bookService.openSnackBar(`${error.statusText}. Please Try Again`);
            })
    }

    deleteRequest(request){
        this.requestService.deleteMyRequest(request)
            .subscribe(requests => {
                this.bookService.openSnackBar(`Successfully Delete Request !`);
                this.showMyrequests();
            },error=>{
                this.bookService.openSnackBar(`${error.statusText}. Please Try Again`);
            })
    }

  ngOnInit() {
      this.showMyrequests();
  }

}
