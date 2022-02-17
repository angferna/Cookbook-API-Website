import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { TooltipModule, TooltipConfig } from 'ngx-bootstrap/tooltip';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainComponent } from './main.component';

// add at line 13:
import {UserService} from '../../components/services/user.service';
import {SquarePipe} from '../../components/pipes/square.pipe';

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

        TooltipModule.forRoot(),
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
