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

  searchText:string;
  books:[any]
  cols:number = 6;
  loading:boolean = true;
  addingBook:boolean = false;
  error:boolean = false;
  isfound:boolean = true;
  addedBook=[];

  constructor(
    private bookService:BookService,
    private router: Router,
  ) { }

  searchBook(title: string) {
    if(title !== ''){
      this.bookService.searchBook(title)
        .subscribe(books=>{
        this.loading = false;
        if(books.length){
          this.books = books;
        } else {
          this.isfound = false;
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
