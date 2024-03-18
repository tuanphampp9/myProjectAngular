import {
  AfterContentInit,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InterfaceUser } from '../../interface-user';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrl: './modal-edit.component.css',
})
export class ModalEditComponent implements OnChanges {
  @Input() isVisible: boolean = false;
  @Output() isVisibleChange: EventEmitter<boolean> = new EventEmitter();
  @Input() userData: InterfaceUser = {
    id: 1,
    email: '',
    first_name: '',
    last_name: '',
    avatar: '',
  };
  @Output() pushData: EventEmitter<InterfaceUser> = new EventEmitter();
  public userForms: FormGroup = new FormGroup({
    id: new FormControl(1),
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
  ngOnChanges(changes: SimpleChanges): void {
    this.userForms.setValue({
      ...this.userData,
    });
  }

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
    this.isVisible = false;
    this.isVisibleChange.emit(false);
  }
  handleOk() {
    this.isVisible = false;
    this.isVisibleChange.emit(false);
    this.pushData.emit(this.userForms.value);
  }
}
