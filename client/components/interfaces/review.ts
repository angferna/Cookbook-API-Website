import {User} from "./user";

export interface Review {
    _id: string;
    reviewDescription: string;
    ratingReview: number;
    dateCreated: Date;
    userReviewer: User;
    __v: string;
}
