import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { FirestoreService } from '../../services/firestore/firestore.service';
import { Check } from '../../models/check.model';
import { Project } from '../../models/project.model';
import { Checkbook } from '../../models/checkbook.model';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit {
  checks: Check[];
  projects: Project[];
  checkbooks: Checkbook[];
  employees: Employee[];

  checkForm = new FormGroup({
    projectInput: new FormControl('', Validators.required),
    checkbookInput: new FormControl('', Validators.required),
    employeeInput: new FormControl('', Validators.required),
    descriptionInput: new FormControl('', Validators.required),
    amountInput: new FormControl('', Validators.required),
  });

  checkModalRef: BsModalRef;
  @ViewChild('addCheckModal') private checkRef: TemplateRef<any>;

  confirmModalRef: BsModalRef;
  @ViewChild('confirmModal') private confirmRef: TemplateRef<any>;

  constructor(
    private firestoreService: FirestoreService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.firestoreService.getCheckCollection().subscribe(data => {
      this.checks = data;
    });

    this.firestoreService.getProjectCollection().subscribe(data => {
      this.projects = data;
    });

    this.firestoreService.getCheckbookCollection().subscribe(data => {
      this.checkbooks = data;
    });

    this.firestoreService.getEmployeeCollection().subscribe(data => {
      this.employees = data;
    });
  }

  addCheck(
    description: string, amount: number, projectId: string,
    checkbookId: string, employeeId: string) {
    const checkbook = this.checkbooks.find(element => element.id === checkbookId);
    const project = this.projects.find(element => element.id === projectId);
    const employee = this.employees.find(element => element.id === employeeId);

    const id = this.firestoreService.createId();

    this.firestoreService.addCheck(id, {
      id, description, amount,
      checkbook: {
        id: checkbook.id,
        name: checkbook.name
      },
      project: {
        id: project.id,
        name: project.name
      },
      employee: {
        id: employee.id,
        name: employee.fName + ' ' + employee.lName
      },

    });
  }

  onSubmit() {
    this.closeCheckModal();
    this.openConfirmModal();
  }

  openCheckModal() {
    this.checkModalRef = this.modalService.show(this.checkRef);
  }

  closeCheckModal() {
    this.checkModalRef.hide();
  }

  openConfirmModal() {
    this.confirmModalRef = this.modalService.show(this.confirmRef);
  }

  confirm(): void {
    this.confirmModalRef.hide();
    this.addCheck(
      this.checkForm.value.descriptionInput, this.checkForm.value.amountInput,
      this.checkForm.value.projectInput, this.checkForm.value.checkbookInput,
      this.checkForm.value.employeeInput);
    this.checkForm.reset();
  }

  decline(): void {
    this.confirmModalRef.hide();
    this.openCheckModal();
  }
}
