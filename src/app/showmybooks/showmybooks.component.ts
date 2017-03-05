import { Component, OnInit } from '@angular/core';
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
    ) { }

    showMybooks(){
        this.bookService.getMyBooks()
            .subscribe(books => {
                if(books.length){
                    this.books = books;
                }
            })
    }


    ngOnInit() {
        this.showMybooks();
    }

}
