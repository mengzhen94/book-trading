import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MybookComponent } from './mybook.component';
import { AddnewbookComponent} from '../addnewbook/addnewbook.component';
import { MybookRoutingModule }   from './mybook-routing.module';
import { ShowMybookComponent } from '../showmybooks/showmybooks.component';
 
@NgModule({
  imports: [ 
      CommonModule,
      FormsModule,
      HttpModule,
      MybookRoutingModule 
    ],
  declarations: [
    MybookComponent,
    AddnewbookComponent,
    ShowMybookComponent,
  ]
})
export class MybookModule { }
