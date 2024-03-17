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
      this.total = data.total;
    });
  }

  public getPage(params: NzTableQueryParams) {
    const { pageIndex, pageSize } = params;
    this.UserService.getAllUserService(4, pageIndex).subscribe(
      (data: any) => (this.listUser = data.data)
    );
  }
  public deleteUser(idUser: number): void {
    this.UserService.deleteUserService(idUser).subscribe((data) =>
      console.log(data)
    );
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
}
