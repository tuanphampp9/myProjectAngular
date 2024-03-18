import { UserService } from './../../services/user-service.service';
import { Component } from '@angular/core';
import { InterfaceUser } from '../../interface-user';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css',
})
export class ListUserComponent {
  public listUser: InterfaceUser[] = [];
  public total: number = 1;
  public visibleModalConfirm: boolean = false;
  public visibleModalEdit: boolean = false;
  public pageIndex: number = 1;
  public userSelected: InterfaceUser = {
    id: 1,
    email: '',
    first_name: '',
    last_name: '',
    avatar: '',
  };
  constructor(private UserService: UserService) {
    this.UserService.getAllUserService(4, 1).subscribe((data: any) => {
      this.listUser = data.data;
      this.total = data.items;
    });
  }

  public getPage(params: NzTableQueryParams) {
    const { pageIndex, pageSize } = params;
    this.pageIndex = pageIndex;
    this.UserService.getAllUserService(4, pageIndex).subscribe(
      (data: any) => (this.listUser = data.data)
    );
  }
  public deleteUser(idUser: number): void {
    this.UserService.deleteUserService(idUser).subscribe();
    this.listUser = this.listUser.filter((user) => user.id !== idUser);
  }
  public getConfirm(response: any): void {
    if (response) {
      this.deleteUser(this.userSelected.id);
    }
  }
  public handleSelectedUser(data: InterfaceUser, type: string): void {
    if (type === 'edit') {
      this.visibleModalEdit = true;
    } else if (type === 'delete') {
      this.visibleModalConfirm = true;
    }
    this.userSelected = data;
  }
  public getDataChild(infoUser: InterfaceUser) {
    this.UserService.updateUserService(infoUser, infoUser.id).subscribe(
      (data) =>
        (this.listUser = this.listUser.map((user) => {
          if (user.id === infoUser.id) {
            return {
              ...infoUser,
            };
          }
          return user;
        }))
    );
  }
}
