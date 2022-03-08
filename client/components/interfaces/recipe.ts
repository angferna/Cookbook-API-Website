import {Review} from "./review";

export interface Recipe {
    _id: string;
    recipeName: string;
    description: string;
    pictureURL: string;
    prepTime: number;
    cookTime: number;
    ingredients: [ingredient: {
        name: string;
        amount: string;
    }];
    directions: [string];
    reviews: [Review];
    __v: number;
}
