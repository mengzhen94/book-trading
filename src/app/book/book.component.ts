import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-showbooks',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: [BookService, RequestService]
})
export class BookComponent implements OnInit {

    books:[any]

    constructor(
        private bookService:BookService,
        private requestService:RequestService,
        private router: Router,
    ) { }

    showBooks(){
        this.bookService.getAllBooks()
            .subscribe(books => {
                if(books.length){
                    this.books = books;
                }
            })
    }

    requestBook(book){
        this.requestService.requestBook(book)
            .subscribe(books => {
                this.requestService.openSnackBar(`Successfully Request Book!`);
                this.router.navigateByUrl('/books', { skipLocationChange: true });
            })
    }

    ngOnInit() {
        this.showBooks();
    }

}