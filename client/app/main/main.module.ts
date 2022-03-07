import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { TooltipModule, TooltipConfig } from 'ngx-bootstrap/tooltip';
import { AlertModule } from 'ngx-bootstrap/alert';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainComponent } from './main.component';

import {UserService} from '../../components/services/user.service';
import {SquarePipe} from '../../components/pipes/square.pipe';
import {CreateUserModule} from "../../components/modals/createUser/createUser.module";
import { TestAlertModule } from "../../components/alerts/testAlert.module";

export const ROUTES: Routes = [
    { path: 'home', component: MainComponent },
];

// update @NgModule declaration to be as follows:
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        RouterModule.forChild(ROUTES),
        CreateUserModule,
        TestAlertModule,
        TooltipModule.forRoot(),
        AlertModule.forRoot(),
    ],
    declarations: [
        MainComponent,
        SquarePipe
    ],

    exports: [
        MainComponent,
    ],

    providers: [
        UserService,
    ]
})
export class MainModule {}
