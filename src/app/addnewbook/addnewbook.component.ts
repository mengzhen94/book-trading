import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addnewbook',
  templateUrl: './addnewbook.component.html',
  styleUrls: ['./addnewbook.component.css'],
  providers: [BookService]
})
export class AddnewbookComponent implements OnInit {

  books:[any]
  loading:boolean = false;
  error:boolean = false;

  constructor(
    private bookService:BookService,
    private router: Router,
  ) { }

  searchBook(title: string) {
    this.loading = true;
    if(title !== ''){
      this.bookService.searchBook(title)
        .subscribe(books=>{
        this.loading = false;
        if(books.length){
          this.books = books;
          this.loading = false;
        } else {
          
        }
      },
      error=>{
        this.loading = false;
        this.error = true;
        console.log(error);
      })
    }
  }

  addBook(book){
    this.bookService.addBook(book)
        .subscribe(books=>{
            this.bookService.openSnackBar(`Successfully Add Book!`);
            this.router.navigateByUrl('/showmybook');
      },
      error=>{
        this.bookService.openSnackBar(`${error.statusText}. Please Try Again`);
      })
  }

  ngOnInit() {
  }

}
