import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModsRoutingModule } from './mods-routing.module';
import { ModalComponent } from './modal/modal.component';
import { ModsHomeComponent } from './mods-home/mods-home.component';
import { SharedModule } from '../shared/shared.module';
import { AccordionComponent } from './accordion/accordion.component';

@NgModule({
  declarations: [ModalComponent, ModsHomeComponent, AccordionComponent],
  imports: [SharedModule, CommonModule, ModsRoutingModule],
})
export class ModsModule {}
