import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-showmybook',
  templateUrl: './showmybooks.component.html',
  styleUrls: ['./showmybooks.component.css'],
  providers: [BookService]
})
export class ShowMybookComponent implements OnInit {

    books:[any]

    constructor(
        private bookService:BookService,
        private router: Router,
    ) { }

    showMybooks(){
        this.bookService.getMyBooks()
            .subscribe(books => {
                if(books.length){
                    this.books = books;
                }
            })
    }

    removeBook(book) {
        this.bookService.removeBook(book)
            .subscribe(books=>{
                this.bookService.openSnackBar(`Successfully Delete Book!`);
                this.router.navigateByUrl('/showmybook');
            },
            error=>{
                this.bookService.openSnackBar(`${error.statusText}. Please Try Again`);
            })
    }


    ngOnInit() {
        this.showMybooks();
    }

}
