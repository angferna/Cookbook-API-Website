import {Component, Input, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';


import {Recipe} from '../../interfaces/recipe';
import {RecipeService} from '../../services/recipe.service';

@Component({
    selector: 'delete-recipe',
    templateUrl: './deleteRecipe.html',
    styleUrls: ['../alertStyle.scss'],
})
export class DeleteRecipeComponent {
    @Input() recipe: Recipe;

    dismissible = true;
    open = false;

    defaultAlerts: any[] = []

    alerts = this.defaultAlerts;

    static parameters = [RecipeService];

    constructor(private recipeService: RecipeService) {
        this.recipeService = recipeService;
    }

    deleteRecipe() {
        this.recipeService.deleteRecipe(this.recipe)
            .then(deletedRecipe => {
                this.defaultAlerts.push({
                    type: 'success',
                    msg: 'Recipe successfully deleted!'
                });
                this.open = true;
            })
            .catch(error => {
                this.defaultAlerts.push({
                    type: 'danger',
                    msg: error.toString()
                });
                this.open = true;
            });
    }
    reset(): void {
        this.alerts = this.defaultAlerts;
    }

    onClosed(dismissedAlert: any): void {
        this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
    }

}
