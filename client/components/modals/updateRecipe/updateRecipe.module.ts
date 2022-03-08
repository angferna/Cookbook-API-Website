import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


import { TooltipModule, TooltipConfig } from 'ngx-bootstrap/tooltip';

import { UpdateRecipeComponent } from './updateRecipe.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {RecipesComponent} from "../../../app/recipes/recipes.component";

export const ROUTES: Routes = [
    {path: 'update-recipe/:id', component: UpdateRecipeComponent},
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        RouterModule.forChild(ROUTES),
    ],
    declarations: [
        UpdateRecipeComponent,
    ],

    exports: [
        UpdateRecipeComponent,
    ],

    providers: [
    ]
})
export class UpdateRecipeModule {}
