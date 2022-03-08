import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { TooltipModule, TooltipConfig } from 'ngx-bootstrap/tooltip';

import { UpdateReviewComponent } from './updateReview.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {ReviewService} from "../../services/review.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
    ],
    declarations: [
        UpdateReviewComponent,
    ],

    exports: [
        UpdateReviewComponent,
    ],

    providers: [
        ReviewService
    ]
})
export class UpdateReviewModule {}
