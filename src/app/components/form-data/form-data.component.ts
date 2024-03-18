import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrl: './form-data.component.css',
})
export class FormDataComponent {
  public userForms: FormGroup = new FormGroup({
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
  constructor(
    private fb: FormBuilder,
    private UserService: UserService,
    private route: Router
  ) {}
  submitForm() {
    this.UserService.createUserService(this.userForms.value).subscribe((data) =>
      console.log(data)
    );
    this.route.navigate(['/list-user']);
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
}
