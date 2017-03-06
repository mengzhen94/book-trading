import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-showbooks',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: [BookService]
})
export class BookComponent implements OnInit {

    books:[any]

    constructor(
        private bookService:BookService,
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

    ngOnInit() {
        this.showBooks();
    }

}