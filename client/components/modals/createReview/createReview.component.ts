import { Component, TemplateRef, Input, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from "../../interfaces/user";
import { UserService } from "../../services/user.service";
import {Review} from "../../interfaces/review";
import {Recipe} from "../../interfaces/recipe";
import {RecipeService} from "../../services/recipe.service";
import {ReviewService} from "../../services/review.service";

@Component({
    selector: 'create-review',
    templateUrl: './createReview.html',
    styleUrls: ['./createReview.scss'],
})

export class CreateReviewComponent {
    private formError: String;
    private formInfo: String;

    static parameters = [BsModalService, RecipeService];

    modalRef?: BsModalRef;

    @Input() recipe: Recipe;
    private review: Review = {
        _id: undefined,
        __v: undefined,
        reviewDescription: undefined,
        ratingReview: undefined,
        dateCreated: undefined,
        userReviewer: undefined,
    };

    constructor(private modalService: BsModalService, private reviewService: ReviewService) {
        this.reviewService = reviewService;
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    createReview() {
        this.reviewService.createReview(this.recipe, this.review)
            .then(createdReview => {
                this.review = createdReview;
                this.formInfo = `Review with id ${createdReview._id} successfully created!`;
                this.formError = null;
            })
            .catch(error => {
                this.formError = JSON.stringify(error);
                this.formInfo = null;
            });
    }

    trackByIndex(index: number, obj: any): any {
        return index;
    }

}
