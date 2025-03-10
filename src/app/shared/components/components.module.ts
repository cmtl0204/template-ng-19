import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonActionComponent} from '@shared/components/button-action/button-action.component';
import {ErrorsFieldComponent} from '@shared/components/errors-field/errors-field.component';
import {FormButtonActionComponent} from '@shared/components/form-button-action/form-button-action.component';
import {HeaderFormComponent} from '@shared/components/header-form/header-form.component';
import {InputSwitchComponent} from '@shared/components/input-switch/input-switch.component';
import {MessageDialogComponent} from '@shared/components/message-dialog/message-dialog.component';
import {ProgressBarComponent} from '@shared/components/progress-bar/progress-bar.component';
import {SkeletonComponent} from '@shared/components/skeleton/skeleton.component';
import {Skeleton} from 'primeng/skeleton';
import {TableModule} from 'primeng/table';
import {ProgressBar} from 'primeng/progressbar';
import {Dialog} from 'primeng/dialog';
import {Button} from 'primeng/button';
import {Toast} from 'primeng/toast';
import {InputSwitch} from 'primeng/inputswitch';
import {Divider} from 'primeng/divider';
import {DropdownModule} from 'primeng/dropdown';
import {ReactiveFormsModule} from '@angular/forms';
import {Panel} from 'primeng/panel';
import {Paginator} from 'primeng/paginator';
import {Tag} from 'primeng/tag';
import {Tooltip} from 'primeng/tooltip';
import {PanelMenu} from 'primeng/panelmenu';
import {Drawer} from 'primeng/drawer';


@NgModule({
  declarations: [
    ButtonActionComponent,
    ErrorsFieldComponent,
    FormButtonActionComponent,
    HeaderFormComponent,
    InputSwitchComponent,
    MessageDialogComponent,
    ProgressBarComponent,
    SkeletonComponent,
  ],
  imports: [
    CommonModule,
    Skeleton,
    TableModule,
    ProgressBar,
    Dialog,
    Button,
    Toast,
    InputSwitch,
    Divider,
    DropdownModule,
    ReactiveFormsModule,
    Panel,
    Paginator,
    Tag,
    Tooltip,
    PanelMenu,
    Drawer
  ],
  exports: [
    ButtonActionComponent,
    ErrorsFieldComponent,
    FormButtonActionComponent,
    HeaderFormComponent,
    InputSwitchComponent,
    MessageDialogComponent,
    ProgressBarComponent,
    SkeletonComponent]
})
export class ComponentsModule {
}
