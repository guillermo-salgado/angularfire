import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { Checkbook } from '../../models/checkbook.model';
import { Employee } from '../../models/employee.model';
import { Project } from '../../models/project.model';
import { Provider } from '../../models/provider.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  // Collections
  private checkbookCollection: AngularFirestoreCollection<Checkbook>;
  private employeeCollection: AngularFirestoreCollection<Employee>;
  private projectCollection: AngularFirestoreCollection<Project>;
  private providerCollection: AngularFirestoreCollection<Provider>;

  constructor(private afs: AngularFirestore) {
    this.checkbookCollection = this.afs.collection<Checkbook>('checkbooks');
    this.employeeCollection = this.afs.collection<Employee>('employees');
    this.projectCollection = this.afs.collection<Project>('projects');
    this.providerCollection = this.afs.collection<Provider>('providers');
  }

  createId() {
    return this.afs.createId();
  }

  getCheckbookCollection(): Observable<Checkbook[]> {
    return this.checkbookCollection.valueChanges();
  }

  addCheckbook(item: Checkbook) {
    this.checkbookCollection.add(item);
  }

  getEmployeeCollection(): Observable<Employee[]> {
    return this.employeeCollection.valueChanges();
  }

  addEmployee(item: Employee) {
    this.employeeCollection.add(item);
  }

  getProjectCollection(): Observable<Project[]> {
    return this.projectCollection.valueChanges();
  }

  addProject(item: Project) {
    this.projectCollection.add(item);
  }

  getProviderCollection(): Observable<Provider[]> {
    return this.providerCollection.valueChanges();
  }

  addProvider(item: Provider) {
    this.providerCollection.add(item);
  }
}
