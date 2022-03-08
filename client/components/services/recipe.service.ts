import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Recipes} from '../interfaces/recipes';
import {Recipe} from "../interfaces/recipe";

@Injectable()
export class RecipeService {

    static parameters = [HttpClient];

    constructor(private httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    getAllRecipes(): Promise<Recipe[]> {
        return this.httpClient
            .get<Recipe[]>('/api/recipes')
            .toPromise();
    }

    getRecipeById(recipeId): Promise<Recipe> {
        let url = `/api/recipes/${recipeId}`;
        return this.httpClient
            .get<Recipe>(url)
            .toPromise();
    }

    updateRecipe(recipe: Recipe): Promise<Recipe> {
        return this.httpClient
            .put<Recipe>(`/api/recipes/${recipe._id}`, recipe)
            .toPromise();
    }

    createRecipe(recipe: Recipe): Promise<Recipe> {
        return this.httpClient
            .post<Recipe>(`/api/recipes`, recipe)
            .toPromise();
    }

    deleteRecipe(recipe: Recipe): Promise<any> {
        return this.httpClient
            .delete<any>(`/api/recipes/${recipe._id}`)
            .toPromise();
    }
}
