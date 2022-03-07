import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';


import { TooltipModule, TooltipConfig } from 'ngx-bootstrap/tooltip';

import { CreateUserComponent } from './createUser.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal'
import {UserService} from "../../services/user.service";
import {MainComponent} from "../../../app/main/main.component";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
    ],
    declarations: [
        CreateUserComponent
    ],

    exports: [
        CreateUserComponent,
    ],

    providers: [
        BsModalService,
        UserService
    ]
})

export class CreateUserModule {}
