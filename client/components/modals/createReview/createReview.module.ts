import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';


import { TooltipModule, TooltipConfig } from 'ngx-bootstrap/tooltip';

import { CreateReviewComponent } from './createReview.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal'
import { RecipeService } from "../../services/recipe.service";
import {MainComponent} from "../../../app/main/main.component";


@NgModule({
    imports: [
        ModalModule.forRoot(),
        BrowserModule,
        FormsModule,
        ModalModule.forRoot()
    ],
    declarations: [
        CreateReviewComponent,
    ],

    exports: [
        CreateReviewComponent,
    ],

    providers: [
        RecipeService,
    ],
})

export class CreateReviewModule {}
