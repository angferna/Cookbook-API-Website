import {Component, Input, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';


import {Recipe} from '../../interfaces/recipe';
import {ReviewService} from '../../services/review.service';
import {Review} from "../../interfaces/review";

@Component({
    selector: 'delete-review',
    templateUrl: './deleteReview.html',
    styleUrls: ['../alertStyle.scss'],
})
export class DeleteReviewComponent {
    @Input() recipe: Recipe;
    @Input() review: Review;

    dismissible = true;
    open = false;

    defaultAlerts: any[] = []

    alerts = this.defaultAlerts;

    static parameters = [ReviewService];

    constructor(private reviewService: ReviewService) {
        this.reviewService = reviewService;
    }

    deleteReview() {
        this.reviewService.deleteReview(this.recipe, this.review)
            .then(deletedReview => {
                this.defaultAlerts.push({
                    type: 'success',
                    msg: 'Review successfully deleted!'
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
