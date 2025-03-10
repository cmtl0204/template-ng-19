import {Component} from '@angular/core';
import {PrimeIcons} from "primeng/api";
import {Clipboard} from '@angular/cdk/clipboard';
import {MessageService} from "primeng/api";
import {CoreMessageEnum} from "@core/enums";
import {CoreService} from '@core/services';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Tooltip} from 'primeng/tooltip';
import {environment} from '@env/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [
    InputText,
    Tooltip,
    Button
  ],
  providers: [MessageService]
})
export class AboutComponent {

  protected readonly PrimeIcons = PrimeIcons;

  constructor(
    protected readonly coreService: CoreService,
    private readonly clipboard: Clipboard,
    private readonly messageServicePn: MessageService,
  ) {
  }

  copy(text: string) {
    this.clipboard.copy(text);
    this.messageServicePn.clear();
    this.messageServicePn.add({
      key: CoreMessageEnum.APP_TOAST,
      severity: 'info',
      summary: 'Copiado',
      detail: text,
    });
  }

  protected readonly environment = environment;
}
