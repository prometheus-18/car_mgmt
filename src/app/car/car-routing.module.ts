import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from './Component/car-list/car-list.component';

const routes: Routes = [
  {path:'',redirectTo:'car-list',pathMatch:'full'},
  {path:'car-list',component:CarListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarRoutingModule { }
