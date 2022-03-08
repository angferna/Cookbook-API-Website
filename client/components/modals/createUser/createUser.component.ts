import { Component, TemplateRef, Input, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from "../../interfaces/user";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'create-user',
    templateUrl: './createUser.html'
})

export class CreateUserComponent {
    private formError: String;
    private formInfo: String;

    static parameters = [BsModalService, UserService];

    modalRef?: BsModalRef;

    private user: User = {
        __v: undefined,
        _id: undefined,
        username: undefined,
        emailAddress: undefined,
        name: {
            _id: undefined,
            firstName: undefined,
            lastName: undefined
        }
    };

    constructor(private modalService: BsModalService, private userService: UserService) { }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }


    createUser() {
        this.userService.createUser(this.user)
            .then(createdUser => {
                this.user = createdUser;
                this.formInfo = `User with id ${createdUser._id} successfully created!`;
                this.formError = null;
            })
            .catch(error => {
                this.formError = JSON.stringify(error);
                this.formInfo = null;
            });
    }

}


