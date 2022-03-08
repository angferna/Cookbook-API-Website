import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { TooltipModule, TooltipConfig } from 'ngx-bootstrap/tooltip';
import { AlertModule } from 'ngx-bootstrap/alert';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// import { ChildComponent } from './child.component';
import {UserService} from '../../components/services/user.service';
import {CreateUserModule} from "../../components/modals/createUser/createUser.module";
import {UpdateUserModule} from "../../components/modals/updateUser/updateUser.module";
import {AllUsersComponent} from "./allUsers.component";

export const ROUTES: Routes = [
    { path: 'all-users', component: AllUsersComponent },
];

// update @NgModule declaration to be as follows:
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        UpdateUserModule,
        CreateUserModule,
        BrowserAnimationsModule,
        RouterModule.forChild(ROUTES),

        AlertModule.forRoot(),
        TooltipModule.forRoot(),
    ],
    declarations: [
        AllUsersComponent,
    ],

    exports: [
        AllUsersComponent,
    ],

    providers: [
        UserService,
    ]
})
export class AllUsersModule {}
