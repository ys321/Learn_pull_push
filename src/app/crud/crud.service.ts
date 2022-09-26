import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Crud } from './crud';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private httpClient:HttpClient) { }
 
  get(){
    return this.httpClient.get<Crud[]>("http://localhost:5008/Crud")
  }

  post(payload: Crud) {
    return this.httpClient.post<Crud>(
      'http://localhost:5008/Crud',
      payload
    );
  }

  update(payload: Crud) {
    return this.httpClient.put<Crud>(
      'http://localhost:5008/Crud',
      payload
    );
  }

  delete(crudId: number) {
    return this.httpClient.delete(
      `http://localhost:5008/Crud?id=${crudId}`
    );
  }




}
