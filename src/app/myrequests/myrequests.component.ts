import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myrequests',
  templateUrl: './myrequests.component.html',
  styleUrls: ['./myrequests.component.css'],
  providers: [BookService]
})
export class MyrequestComponent implements OnInit {

  requests:[any]

  constructor(
    private bookService:BookService,
    private router: Router,
  ) { }


  showMyrequests(){
        this.bookService.getMyBooks()
            .subscribe(books => {
                if(books.length){
                    //this.books = books;
                }
            })
    }

  ngOnInit() {
      this.showMyrequests();
  }

}
