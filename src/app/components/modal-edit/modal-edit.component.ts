import {
  AfterContentInit,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InterfaceUser } from '../../interface-user';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrl: './modal-edit.component.css',
})
export class ModalEditComponent {
  @Input() isVisible: boolean = false;
  @Output() isVisibleChange: EventEmitter<boolean> = new EventEmitter();
  @Input() userData: InterfaceUser = {
    id: 1,
    email: '',
    first_name: '',
    last_name: '',
    avatar: '',
  };
  public userForms: FormGroup = new FormGroup({
    id: new FormControl(),
    email: new FormControl('', [Validators.email]),
    first_name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    last_name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    avatar: new FormControl(''),
  });
  @Output() userDataChange: EventEmitter<InterfaceUser> = new EventEmitter();
  constructor(private UserService: UserService) {}

  getErrorMsg(controlName: string): string {
    const control = this.userForms.get(controlName);
    if (control?.hasError('required')) {
      return 'Không được để trống';
    }
    if (control?.hasError('minlength')) {
      return `Phải tối thiểu ${
        control.errors!['minlength'].requiredLength
      } kí tự`;
    }
    return '';
  }
  handleCancel() {
    console.log(this.userForms);
    this.isVisible = false;
  }
  handleOk() {
    this.isVisible = false;
    this.UserService.updateUserService(
      this.userForms.value,
      this.userData.id
    ).subscribe((data) => data);
  }
}
