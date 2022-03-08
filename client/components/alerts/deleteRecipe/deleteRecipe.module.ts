import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';


import { TooltipModule, TooltipConfig } from 'ngx-bootstrap/tooltip';
import { AlertModule } from 'ngx-bootstrap/alert';

import { ModalModule, BsModalService } from 'ngx-bootstrap/modal'
import { DeleteRecipeComponent } from "./deleteRecipe.component";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        AlertModule.forRoot(),
    ],
    declarations: [
        DeleteRecipeComponent,
    ],

    exports: [
        DeleteRecipeComponent
    ],

    providers: [
    ]
})

export class DeleteRecipeModule {}
