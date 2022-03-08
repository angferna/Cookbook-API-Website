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
        ModalModule.forRoot(),
        BrowserModule,
        FormsModule,
        ModalModule.forRoot()
    ],
    declarations: [
        CreateUserComponent
    ],

    exports: [
        CreateUserComponent,
    ],

    providers: [],
})

export class CreateUserModule {}
