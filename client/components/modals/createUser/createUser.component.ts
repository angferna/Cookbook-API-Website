import { Component, TemplateRef, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from "../../interfaces/user";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'create-user',
    templateUrl: './createUser.html'
})

export class CreateUserComponent implements OnInit {
    private user: User = {
        __v: undefined,
        _id: undefined,
        address: {
            _id: undefined,
            addressLine1: undefined,
            addressLine2: undefined,
            city: undefined,
            state: undefined,
            zip: undefined,
            __v: undefined
        },
        age: undefined,
        name: {
            _id: undefined,
            firstName: undefined,
            middleName: undefined,
            lastName: undefined
        }
    };

    @Input() age: Number;
    @Input() firstName: String;
    @Input() middleName: String;
    @Input() lastName: String;
    @Input() addressLine1: String;
    @Input() addressLine2: String;
    @Input() city: String;
    @Input() state: String;
    @Input() zip: Number;

    // this.user.age = age;
    // User.name.firstName: String;
    // User.name.middleName: String;
    // User.name.lastName: String;
    // User.address.addressLine1: String;
    // User.address.addressLine2: String;
    // User.address.city: String;
    // User.address.state: String;
    // User.address.zip: Number;

    static parameters: [];

    modalRef?: BsModalRef;
    modalService?: BsModalService;
    userService: UserService;

    constructor() { }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }


    ngOnInit() {
        // this.route.params.subscribe(params => {
        // this.userService.createUser(this.user)
        //     .then(user => {
        //         this.user = user;
        //     });
        // });
    }

}



