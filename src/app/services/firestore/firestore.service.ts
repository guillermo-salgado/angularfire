import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { Checkbook } from '../../models/checkbook.model';
import { Employee } from '../../models/employee.model';
import { Project } from '../../models/project.model';
import { Provider } from '../../models/provider.model';
import { Check } from '../../models/check.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  // Collections
  private checkbookCollection: AngularFirestoreCollection<Checkbook>;
  private employeeCollection: AngularFirestoreCollection<Employee>;
  private projectCollection: AngularFirestoreCollection<Project>;
  private providerCollection: AngularFirestoreCollection<Provider>;
  private checkCollection: AngularFirestoreCollection<Check>;

  constructor(private afs: AngularFirestore) {
    this.checkbookCollection = this.afs.collection<Checkbook>('checkbooks');
    this.employeeCollection = this.afs.collection<Employee>('employees');
    this.projectCollection = this.afs.collection<Project>('projects');
    this.providerCollection = this.afs.collection<Provider>('providers');
    this.checkCollection = this.afs.collection<Check>('checks');
  }

  createId() {
    return this.afs.createId();
  }

  getCheckbookCollection(): Observable<Checkbook[]> {
    return this.checkbookCollection.valueChanges();
  }

  addCheckbook(id: string, item: Checkbook) {
    this.checkbookCollection.doc(id).set(item);
  }

  getEmployeeCollection(): Observable<Employee[]> {
    return this.employeeCollection.valueChanges();
  }

  addEmployee(id: string, item: Employee) {
    this.employeeCollection.doc(id).set(item);
  }

  getProjectCollection(): Observable<Project[]> {
    return this.projectCollection.valueChanges();
  }

  addProject(id: string, item: Project) {
    this.projectCollection.doc(id).set(item);
  }

  getProviderCollection(): Observable<Provider[]> {
    return this.providerCollection.valueChanges();
  }

  addProvider(id: string, item: Provider) {
    this.providerCollection.doc(id).set(item);
  }

  getCheckCollection(): Observable<Check[]> {
    return this.checkCollection.valueChanges();
  }

  addCheck(id: string, item: Check) {
    this.checkCollection.doc(id).set(item);
  }
}
