import { NgModule }     from '@angular/core';
import { Routes,
         RouterModule } from '@angular/router';

import { AddnewbookComponent} from '../addnewbook/addnewbook.component';
import { MybookComponent} from './mybook.component';
import { ShowMybookComponent } from '../showmybooks/showmybooks.component';
import { MyrequestComponent} from '../myrequests/myrequests.component';

const routes: Routes = [
  { path: '',
    component: MybookComponent,
    children: [
      { path: '', redirectTo: '/showmybook', pathMatch: 'full' },
      { path: 'showmybook', component: ShowMybookComponent },
      { path: 'addbook', component: AddnewbookComponent },
      { path: 'request', component: MyrequestComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MybookRoutingModule {}