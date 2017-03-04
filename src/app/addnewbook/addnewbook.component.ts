import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

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
  ) { }

  searchBook(title: string) {
    if(title !== ''){
      this.bookService.searchBook(title)
        .subscribe(books=>{
        this.loading = false;
        if(books.length){
          this.books = books;
          console.log("books: ", books);
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

  ngOnInit() {
  }

}
