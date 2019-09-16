import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { FirestoreService } from '../../services/firestore/firestore.service';
import { Checkbook } from '../../models/checkbook.model';

@Component({
  selector: 'app-checkbook',
  templateUrl: './checkbook.component.html',
  styleUrls: ['./checkbook.component.scss']
})
export class CheckbookComponent implements OnInit {
  checkbooks: Checkbook[];
  checkbookForm = new FormGroup({
    nameInput: new FormControl('', Validators.required),
    descriptionInput: new FormControl('')
  });

  checkbookModalRef: BsModalRef;
  @ViewChild('addCheckbookModal') private checkbookRef: TemplateRef<any>;

  confirmModalRef: BsModalRef;
  @ViewChild('confirmModal') private confirmRef: TemplateRef<any>;

  constructor(
    private firestoreService: FirestoreService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.firestoreService.getCheckbookCollection().subscribe(data => {
      this.checkbooks = data;
    });
  }

  addCheckbook(name: string, description: string) {
    const id = this.firestoreService.createId();

    this.firestoreService.addCheckbook(id, {
      id, name, description
    });
  }

  onSubmit() {
    this.closeCheckbookModal();
    this.openConfirmModal();
  }

  openCheckbookModal() {
    this.checkbookModalRef = this.modalService.show(this.checkbookRef);
  }

  closeCheckbookModal() {
    this.checkbookModalRef.hide();
  }

  openConfirmModal() {
    this.confirmModalRef = this.modalService.show(this.confirmRef);
  }

  confirm(): void {
    this.confirmModalRef.hide();
    this.addCheckbook(
      this.checkbookForm.value.nameInput, this.checkbookForm.value.descriptionInput);
    this.checkbookForm.reset();
  }

  decline(): void {
    this.confirmModalRef.hide();
    this.openCheckbookModal();
  }

}
