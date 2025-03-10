import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {IconButtonActionEnum, LabelButtonActionEnum, SeverityButtonActionEnum} from "@core/enums";
import {CoreService} from "@core/services";

type Severity = 'success' | 'info' | 'warn' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast';

@Component({
  selector: 'app-form-button-action',
  templateUrl: './form-button-action.component.html',
  styleUrl: './form-button-action.component.scss',
  standalone: false,
})
export class FormButtonActionComponent {
  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Input() labelSubmitButton: string = LabelButtonActionEnum.SAVE;
  @Input() labelCancelButton: string = LabelButtonActionEnum.RETURN;
  @Input() iconSubmitButton: string = IconButtonActionEnum.SAVE;
  @Input() iconCancelButton: string = IconButtonActionEnum.RETURN;
  @Input() severitySubmitButton:Severity = SeverityButtonActionEnum.SAVE;
  @Input() severityCancelButton:Severity = SeverityButtonActionEnum.RETURN;
  @Input() isVisibleCancelButton = true;
  @Input() isVisibleSubmitButton = true;

  protected readonly coreService = inject(CoreService);

  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;

}
