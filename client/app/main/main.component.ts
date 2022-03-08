import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from "../../components/interfaces/recipe";
import { Recipes } from "../../components/interfaces/recipes";
import {RecipeService} from "../../components/services/recipe.service";
import {UserService} from "../../components/services/user.service";
import {User} from "../../components/interfaces/user";

@Component({
    selector: 'main',
    templateUrl: './main.html',
    styleUrls: ['./main.scss'],
})
export class MainComponent implements OnInit {

    public users: User[];
    public recipes: Recipe[];
    static parameters = [HttpClient, RecipeService, UserService];

    constructor(private http: HttpClient, private recipeService: RecipeService, private userService: UserService) {
        this.http = http;

        this.recipeService = recipeService;
        this.getRecipeData();

        this.userService = userService;
        this.getUserData();
    }

    public getRecipeData() {
        this.recipeService.getAllRecipes()
            .then(response => {
                this.recipes = response as Recipe[];
            })
            .catch(this.handleError);
    }
    public getUserData() {
        this.userService.getAllUsers()
            .then(response => {
                this.users = response as User[];
            })
            .catch(this.handleError);
    }


    private trackByIndex(index: number, obj: any): any {
        return index;
    }

    private handleError(error: any): Promise<any> {
        console.error('Something has gone wrong', error);
        return Promise.reject(error.message || error);
    }

    ngOnInit() {
    }

}
