import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { CheckbookComponent } from './components/checkbook/checkbook.component';
import { CheckComponent } from './components/check/check.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ProviderComponent } from './components/provider/provider.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ProjectComponent } from './components/project/project.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckbookComponent,
    CheckComponent,
    InvoiceComponent,
    ProviderComponent,
    EmployeeComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,

    AngularFireModule.initializeApp(environment.firebase, 'craco'),
    AngularFirestoreModule,

    ModalModule.forRoot(),

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
