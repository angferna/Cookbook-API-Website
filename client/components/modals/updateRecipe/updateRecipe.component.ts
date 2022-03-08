import {Component, Input, TemplateRef, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Recipe} from '../../interfaces/recipe';
import {RecipeService} from '../../services/recipe.service';
import { ActivatedRoute } from '@angular/router'


@Component({
    selector: 'update-recipe',
    templateUrl: './updateRecipe.html',
    styleUrls: ['./updateRecipe.scss'],
})
export class UpdateRecipeComponent {
    @Input() recipe: Recipe;
    public formError: String;
    public formInfo: String;

    private modalRef?: BsModalRef;
    static parameters = [BsModalService, RecipeService];

    constructor(private modalService: BsModalService, private recipeService: RecipeService) {
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    trackByIndex(index: number, obj: any): any {
        return index;
    }

    updateRecipe() {
        this.recipeService.updateRecipe(this.recipe)
            .then(updatedRecipe => {
                this.formInfo = 'Recipe successfully updated!';
                this.formError = null;
            })
            .catch(error => {
                this.formInfo = null;
                this.formError = error.toString();
            });
    }

    private handleError(error: any): Promise<any> {
        console.error('Something has gone wrong', error);
        return Promise.reject(error.message || error);
    }

}
