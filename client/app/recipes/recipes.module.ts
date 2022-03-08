import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { TooltipModule, TooltipConfig } from 'ngx-bootstrap/tooltip';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {RecipesComponent} from "./recipes.component";
import {CreateRecipeModule} from "../../components/modals/createRecipe/createRecipe.module";
import {UpdateRecipeModule} from "../../components/modals/updateRecipe/updateRecipe.module";
import {DeleteRecipeModule} from "../../components/alerts/deleteRecipe/deleteRecipe.module";
import {CreateReviewModule} from "../../components/modals/createReview/createReview.module";
import {UpdateReviewModule} from "../../components/modals/updateReview/updateReview.module";
import {DeleteReviewModule} from "../../components/alerts/deleteReview/deleteReview.module";


export const ROUTES: Routes = [
    {path: 'recipes/:id', component: RecipesComponent},
];


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        RouterModule.forChild(ROUTES),

        CreateRecipeModule,
        UpdateRecipeModule,
        DeleteRecipeModule,

        CreateReviewModule,
        UpdateReviewModule,
        DeleteReviewModule,

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


export class RecipesModule {}
