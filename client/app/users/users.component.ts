import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { User } from "../../components/interfaces/User";
import { UserService } from "../../components/services/user.service";

@Component({
    selector: 'users',
    templateUrl: './users.html',
    styleUrls: ['./users.scss'],
})

export class UsersComponent implements OnInit {

    public user: User;
    static parameters = [ActivatedRoute, UserService];

    constructor(private userService: UserService, private route: ActivatedRoute) {
        this.route = route;
        this.userService = userService;
    }


    ngOnInit() {
        this.route.params.subscribe(params => {
            this.userService.getUserById(params.id)
                .then(user => {
                    this.user = user;
                });
        });
    }

}
