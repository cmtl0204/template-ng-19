import {Component, inject} from '@angular/core';
import {MessageDialogService} from '@core/services';
import {PrimeIcons} from "primeng/api";

type Severity = 'success' | 'info' | 'warn' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrl: './message-dialog.component.scss',
  standalone: false,
})
export class MessageDialogComponent {
  protected readonly messageDialogService = inject(MessageDialogService);
  protected readonly Array = Array;
  protected readonly PrimeIcons = PrimeIcons;


}
