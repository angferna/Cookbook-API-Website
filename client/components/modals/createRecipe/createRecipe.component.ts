import { Component, TemplateRef, Input, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from "../../interfaces/user";
import { UserService } from "../../services/user.service";
import {Review} from "../../interfaces/review";
import {Recipe} from "../../interfaces/recipe";
import {RecipeService} from "../../services/recipe.service";

@Component({
    selector: 'create-recipe',
    templateUrl: './createRecipe.html'
})

export class CreateRecipeComponent {
    private formError: String;
    private formInfo: String;

    static parameters = [BsModalService, RecipeService];

    modalRef?: BsModalRef;

    private recipe: Recipe = {
        _id: undefined,
        __v: undefined,
        recipeName: undefined,
        description: undefined,
        pictureURL: undefined,
        prepTime: undefined,
        cookTime: undefined,
        ingredients: undefined,
        directions: undefined,
        reviews: undefined,
    };

    constructor(private modalService: BsModalService, private recipeService: RecipeService) { }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }


    createRecipe() {
        this.recipeService.createRecipe(this.recipe)
            .then(createdRecipe => {
                this.recipe = createdRecipe;
                this.formInfo = `Recipe with id ${createdRecipe._id} successfully created!`;
                this.formError = null;
            })
            .catch(error => {
                this.formError = JSON.stringify(error);
                this.formInfo = null;
            });
    }

}
