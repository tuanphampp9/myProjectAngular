import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrl: './modal-confirm.component.css',
})
export class ModalConfirmComponent {
  @Input() isVisible: boolean = false;
  @Input() email: string = '';
  @Output() isVisibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() pushConfirm: EventEmitter<boolean> = new EventEmitter();
  handleOk() {
    this.isVisible = true;
    this.pushConfirm.emit(true);
  }
  handleCancel() {
    this.isVisible = false;
    this.pushConfirm.emit(false);
  }
}
