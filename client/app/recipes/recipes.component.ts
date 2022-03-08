import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import {Recipe} from "../../components/interfaces/recipe";
import {Recipes} from "../../components/interfaces/recipes"
import {RecipeService} from "../../components/services/recipe.service";

@Component({
    selector: 'recipes',
    templateUrl: './recipes.html',
    styleUrls: ['./recipes.scss'],
})

export class RecipesComponent implements OnInit {

    public recipe: Recipe;
    static parameters = [ActivatedRoute, RecipeService];

    constructor(private recipeService: RecipeService, private route: ActivatedRoute) {
        this.route = route;
        this.recipeService = recipeService;
    }

    private trackByIndex(index: number, obj: any): any {
        return index;
    }

    private handleError(error: any): Promise<any> {
        console.error('Something has gone wrong', error);
        return Promise.reject(error.message || error);
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.recipeService.getRecipeById(params.id)
                .then(recipe => {
                    this.recipe = recipe;
                })
                .catch(this.handleError);
        });
    }

}
