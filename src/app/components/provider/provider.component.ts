import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { FirestoreService } from '../../services/firestore/firestore.service';
import { Provider } from '../../models/provider.model';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit {
  providers: Provider[];
  providerForm = new FormGroup({
    nameInput: new FormControl('', Validators.required),
    descriptionInput: new FormControl('')
  });

  providerModalRef: BsModalRef;
  @ViewChild('addProviderModal') private providerRef: TemplateRef<any>;

  confirmModalRef: BsModalRef;
  @ViewChild('confirmModal') private confirmRef: TemplateRef<any>;

  constructor(
    private firestoreService: FirestoreService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.firestoreService.getProviderCollection().subscribe(data => {
      this.providers = data;
    });
  }

  addProvider(name: string, description: string) {
    const id = this.firestoreService.createId();

    this.firestoreService.addProvider(id, {
      id, name, description
    });
  }

  onSubmit() {
    this.closeProviderModal();
    this.openConfirmModal();
  }

  openProviderModal() {
    this.providerModalRef = this.modalService.show(this.providerRef);
  }

  closeProviderModal() {
    this.providerModalRef.hide();
  }

  openConfirmModal() {
    this.confirmModalRef = this.modalService.show(this.confirmRef);
  }

  confirm(): void {
    this.confirmModalRef.hide();
    this.addProvider(
      this.providerForm.value.nameInput, this.providerForm.value.descriptionInput);
    this.providerForm.reset();
  }

  decline(): void {
    this.confirmModalRef.hide();
    this.openProviderModal();
  }

}
