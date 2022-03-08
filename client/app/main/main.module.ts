import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { TooltipModule, TooltipConfig } from 'ngx-bootstrap/tooltip';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainComponent } from './main.component';
import { CreateRecipeModule } from "../../components/modals/createRecipe/createRecipe.module";
import {RecipeService} from "../../components/services/recipe.service";
import {UserService} from "../../components/services/user.service";
import {UpdateRecipeModule} from "../../components/modals/updateRecipe/updateRecipe.module";
import {ReviewService} from "../../components/services/review.service";
import {CreateReviewModule} from "../../components/modals/createReview/createReview.module";


export const ROUTES: Routes = [
    { path: 'home', component: MainComponent },
];


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,

        BrowserAnimationsModule,
        RouterModule.forChild(ROUTES),
        CreateRecipeModule,
        UpdateRecipeModule,
        CreateReviewModule,

        TooltipModule.forRoot(),
    ],
    declarations: [
        MainComponent,
    ],

    exports: [
        MainComponent,
    ],
    providers: [
        RecipeService,
        UserService,
        ReviewService,
    ]
})
export class MainModule {}
