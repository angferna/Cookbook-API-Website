import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { TooltipModule, TooltipConfig } from 'ngx-bootstrap/tooltip';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {RecipesComponent} from "./recipes.component";


export const ROUTES: Routes = [
    {path: 'recipes/:id', component: RecipesComponent},
];


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        RouterModule.forChild(ROUTES),

        TooltipModule.forRoot(),
    ],
    declarations: [
        RecipesComponent,
    ],

    exports: [
        RecipesComponent
    ],

    providers: []
})


export class UsersModule {}
