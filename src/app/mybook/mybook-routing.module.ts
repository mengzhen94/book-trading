import { NgModule }     from '@angular/core';
import { Routes,
         RouterModule } from '@angular/router';

import { AddnewbookComponent} from '../addnewbook/addnewbook.component';
import { MybookComponent} from './mybook.component';

const routes: Routes = [
  { path: '',
    component: MybookComponent,
    children: [
      //{ path: '',    component: HeroListComponent },
      { path: 'addbook', component: AddnewbookComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MybookRoutingModule {}