import { Component, OnInit } from '@angular/core';

import {Crud} from './crud';
import { CrudService } from './crud.service';
declare var window: any;

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  addorupdatemodal: any;
  crudForm: Crud = {
    age: 0,
    gender: 'Male',
    id: 0,
    name: '',
  };
  addorupdatemodalTitle: string = '';
  cruds: Crud[] = [];
  deleteModal: any;
  crudIdToDelete: number = 0;




  // crud:Crud[] = [];
  constructor(private crudService:CrudService) { }

  ngOnInit(): void {
    this.get();
    this.addorupdatemodal = new window.bootstrap.Modal(
      document.getElementById('addorupdatemodal')
    );

    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );
  }
  get(){
    debugger;
    this.crudService.get()
    .subscribe({
      next:(data) => {
        console.log("data",data);
        
        this.cruds = data;
      },
      error:(err) => {
        console.log(err);
      }
    })
  }



  openAddOrUpdateModal(crudId: number) {
    if (crudId === 0) {
      this.addorupdatemodalTitle = 'Add';
      this.crudForm = {
        age: 0,
        gender: 'Male',
        id: 0,
        name: '',
      };
      this.addorupdatemodal.show();
    } else {
      this.addorupdatemodalTitle = 'Update';
      this.crudForm = this.cruds.filter((s) => s.id === crudId)[0];
      this.addorupdatemodal.show();
    }
  }

  createorUpdatecrud() {
    if (this.crudForm.id == 0) {
      this.crudService.post(this.crudForm).subscribe({
        next: (data) => {
          this.cruds.unshift(data);
          this.addorupdatemodal.hide();
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.crudService.update(this.crudForm).subscribe({
        next: (data) => {
          this.cruds = this.cruds.filter((_) => _.id !== data.id);
          this.cruds.unshift(data);
          this.addorupdatemodal.hide();
        },
      });
    }
  }

  openDeleteModal(crudId: number) {
    this.crudIdToDelete = crudId;
    this.deleteModal.show();
  }

  confirmDelete(){
    this.crudService.delete(this.crudIdToDelete)
    .subscribe({
      next:(data) => {
        this.cruds = this.cruds.filter(_ => _.id !== this.crudIdToDelete);
        this.deleteModal.hide();
      },
      error:(error) => {
        console.log(error);
      }
    })
  }
}
