import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { TooltipModule, TooltipConfig } from 'ngx-bootstrap/tooltip';

import { UpdateUserComponent } from './updateUser.component';
import {ModalModule} from 'ngx-bootstrap/modal';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
    ],
    declarations: [
        UpdateUserComponent
    ],

    exports: [
        UpdateUserComponent,
    ],

    providers: [
    ]
})
export class UpdateUserModule {}
