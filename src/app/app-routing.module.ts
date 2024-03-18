import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUserComponent } from './components/list-user/list-user.component';
import { FormDataComponent } from './components/form-data/form-data.component';

const routes: Routes = [
  { path: 'list-user', component: ListUserComponent },
  { path: 'add-user', component: FormDataComponent },
  // { path: '**', component: </h2> },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
