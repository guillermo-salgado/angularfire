import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { FirestoreService } from '../../services/firestore/firestore.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[];
  employeeForm = new FormGroup({
    fNameInput: new FormControl('', Validators.required),
    lNameInput: new FormControl('', Validators.required),
    ageInput: new FormControl(0, Validators.required),
  });

  employeeModalRef: BsModalRef;
  @ViewChild('addEmployeeModal') private employeeRef: TemplateRef<any>;

  confirmModalRef: BsModalRef;
  @ViewChild('confirmModal') private confirmRef: TemplateRef<any>;

  constructor(
    private firestoreService: FirestoreService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.firestoreService.getEmployeeCollection().subscribe(data => {
      this.employees = data;
    });
  }

  addEmployee(fName: string, lName: string, age: number) {
    this.firestoreService.addEmployee({
      id: this.firestoreService.createId(),
      fName, lName, age
    });
  }

  onSubmit() {
    this.closeEmployeeModal();
    this.openConfirmModal();
  }

  openEmployeeModal() {
    this.employeeModalRef = this.modalService.show(this.employeeRef);
  }

  closeEmployeeModal() {
    this.employeeModalRef.hide();
  }

  openConfirmModal() {
    this.confirmModalRef = this.modalService.show(this.confirmRef);
  }

  confirm(): void {
    this.confirmModalRef.hide();
    this.addEmployee(
      this.employeeForm.value.fNameInput, this.employeeForm.value.lNameInput, this.employeeForm.value.ageInput);
    this.employeeForm.reset();
  }

  decline(): void {
    this.confirmModalRef.hide();
    this.openEmployeeModal();
  }

}
