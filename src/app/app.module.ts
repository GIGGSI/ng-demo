import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EmployeesComponent} from './employees/employees.component';
import {EmployeeComponent} from './employees/employee/employee.component';
import {MaterialModule} from './material/material.module';
import {environment} from '../environments/environment';
import {EmployeeListComponent} from './employees/employee-list/employee-list.component';

import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {MatConfirmDialogComponent} from './mat-confirm-dialog/mat-confirm-dialog.component';

const config = {
  apiKey: 'AIzaSyD_IBAGNMFDx35O_dkhdgS__zWw2Whmmpc',
  authDomain: 'ng-crud-bdd6c.firebaseapp.com',
  databaseURL: 'https://ng-crud-bdd6c-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'ng-crud-bdd6c',
  storageBucket: 'ng-crud-bdd6c.appspot.com',
  messagingSenderId: '584700558718',
  appId: '1:584700558718:web:fd7b6ae697e2018fbfc72f',
  measurementId: 'G-ES24NTV1SQ'
}

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    MatConfirmDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    FormsModule,
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [EmployeeComponent, MatConfirmDialogComponent]
})
export class AppModule {
}
