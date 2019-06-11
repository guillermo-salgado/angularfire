import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { FirestoreService } from '../../services/firestore/firestore.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projects: Project[];
  projectForm = new FormGroup({
    nameInput: new FormControl('', Validators.required),
    descriptionInput: new FormControl('')
  });

  projectModalRef: BsModalRef;
  @ViewChild('addProjectModal') private projectRef: TemplateRef<any>;

  confirmModalRef: BsModalRef;
  @ViewChild('confirmModal') private confirmRef: TemplateRef<any>;

  constructor(
    private firestoreService: FirestoreService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.firestoreService.getProjectCollection().subscribe(data => {
      this.projects = data;
    });
  }

  addProject(name: string, description: string) {
    this.firestoreService.addProject({
      id: this.firestoreService.createId(),
      name, description
    });
  }

  onSubmit() {
    this.closeProjectModal();
    this.openConfirmModal();
  }

  openProjectModal() {
    this.projectModalRef = this.modalService.show(this.projectRef);
  }

  closeProjectModal() {
    this.projectModalRef.hide();
  }

  openConfirmModal() {
    this.confirmModalRef = this.modalService.show(this.confirmRef);
  }

  confirm(): void {
    this.confirmModalRef.hide();
    this.addProject(
      this.projectForm.value.nameInput, this.projectForm.value.descriptionInput);
    this.projectForm.reset();
  }

  decline(): void {
    this.confirmModalRef.hide();
    this.openProjectModal();
  }

}
