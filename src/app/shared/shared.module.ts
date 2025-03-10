import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedRoutingModule} from './shared-routing.module';
import {DirectivesModule} from '@shared/directives/directives.module';
import {ComponentsModule} from '@shared/components/components.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    DirectivesModule,
    ComponentsModule
  ],
  exports: [
    DirectivesModule,
    ComponentsModule
  ]
})
export class SharedModule {
}
