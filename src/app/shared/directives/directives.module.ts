import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorMessageDirective} from '@shared/directives/error-message.directive';
import {LabelDirective} from '@shared/directives/label.directive';


@NgModule({
  declarations: [ErrorMessageDirective, LabelDirective,],
  imports: [
    CommonModule
  ],
  exports: [ErrorMessageDirective, LabelDirective,],
})
export class DirectivesModule {
}
