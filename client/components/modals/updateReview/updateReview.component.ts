import {Component, Input, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Recipe} from '../../interfaces/recipe';
import {RecipeService} from '../../services/recipe.service';
import {Review} from "../../interfaces/review";
import {ReviewService} from "../../services/review.service";

@Component({
    selector: 'update-review',
    templateUrl: './updateReview.html',
    styleUrls: ['./updateReview.scss'],
})
export class UpdateReviewComponent {
    @Input() recipe: Recipe;
    @Input() review: Review;
    public formError: String;
    public formInfo: String;

    private modalRef?: BsModalRef;
    static parameters = [BsModalService, ReviewService];

    constructor(private modalService: BsModalService, private reviewService: ReviewService) {
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    trackByIndex(index: number, obj: any): any {
        return index;
    }

    updateRecipe() {
        this.reviewService.updateReview(this.recipe, this.review)
            .then(updatedReview => {
                this.formInfo = 'Review successfully updated!';
                this.formError = null;
            })
            .catch(error => {
                this.formInfo = null;
                this.formError = error.toString();
            });
    }
}
