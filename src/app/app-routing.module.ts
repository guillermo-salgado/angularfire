import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckComponent } from './components/check/check.component';
import { CheckbookComponent } from './components/checkbook/checkbook.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ProjectComponent } from './components/project/project.component';
import { ProviderComponent } from './components/provider/provider.component';

const routes: Routes = [
  { path: 'cheques', component: CheckComponent },
  { path: 'chequeras', component: CheckbookComponent },
  { path: 'empleados', component: EmployeeComponent },
  { path: 'facturas', component: InvoiceComponent },
  { path: 'proyectos', component: ProjectComponent },
  { path: 'proveedores', component: ProviderComponent },

  // Wildcard
  { path: '**',
    redirectTo: 'cheques',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
