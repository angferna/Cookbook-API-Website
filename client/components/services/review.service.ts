import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Review} from "../interfaces/review";
import {Recipe} from "../interfaces/recipe";

@Injectable()
export class ReviewService {
    static parameters = [HttpClient];
    constructor(private httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    getReviewById(recipeId, reviewId): Promise<Review> {
        let url = `/api/recipes/${recipeId}/reviews/${reviewId}`;
        return this.httpClient
            .get<Review>(url)
            .toPromise();
    }

    updateReview(recipe: Recipe, review: Review): Promise<Review> {
        return this.httpClient
            .put<Review>(`/api/recipes/${recipe._id}/${review._id}`, review)
            .toPromise();
    }

    createReview(recipe: Recipe, review: Review): Promise<Review> {
        return this.httpClient
            .post<Review>(`/api/recipes/${recipe._id}/${review._id}`, review)
            .toPromise();
    }

    deleteReview(recipe: Recipe, review: Review): Promise<any> {
        return this.httpClient
            .delete<any>(`/api/recipes/${recipe._id}/${review._id}`)
            .toPromise();
    }
}
