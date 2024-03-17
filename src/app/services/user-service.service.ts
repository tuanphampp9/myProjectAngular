import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { InterfaceUser } from '../interface-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  API_URL = environment.API_URL;
  getAllUserService(perPage: number, pageId: number) {
    const params = new HttpParams()
      .append('per_page', perPage)
      .append('page', pageId);
    return this.http.get(`${this.API_URL}`, { params: params });
  }
  deleteUserService(idUser: number) {
    return this.http.delete(`${this.API_URL}/${idUser}`);
  }
  createUserService(data: InterfaceUser) {
    return this.http.post(this.API_URL, data);
  }
  updateUserService(data: InterfaceUser, idUser: number) {
    return this.http.put(`${this.API_URL}/${idUser}`, data);
  }
}
