import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LabelButtonActionEnum} from "@core/enums";
import {MenuItem} from "primeng/api";
import {format} from "date-fns";
import {environment} from '@env/environment';

@Component({
  selector: 'app-button-action',
  templateUrl: './button-action.component.html',
  styleUrls: ['./button-action.component.scss'],
  standalone: false,
})
export class ButtonActionComponent {
  @Input() enabled: boolean = false;
  @Input() buttonActions: MenuItem[] = [];
  @Output() isHide: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected currentYear: string;
  protected appCompanyName: string;

  constructor() {
    this.currentYear = format(new Date(), 'yyyy');
    this.appCompanyName= environment.APP_COMPANY_NAME;
  }

}
