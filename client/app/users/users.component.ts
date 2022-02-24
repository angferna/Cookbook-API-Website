import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'
import { User } from "../../components/interfaces/user";
import { UserService } from "../../components/services/user.service";

@Component({
    selector: 'users',
    templateUrl: './users.html',
    styleUrls: ['./users.scss'],
})

export class UsersComponent implements OnInit {

    public users: User[];
    private userId: String;
    private user: any;
    public input: string;
    static parameters = [HttpClient, UserService];

    constructor(private http: HttpClient, private userService: UserService, private route: ActivatedRoute) {
        this.http = http;
        this.userService = userService;
        this.getUserById();
    }

    public getUserById(){
        this.userService.getUserById(this.userId)
            .then(response => {
                this.users = response.users as User[];
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Something has gone wrong', error);
        return Promise.reject(error.message || error);
    }

    ngOnInit() {
        this.user = this.route.params.subscribe(params => {
            this.userId = params['id'];
        });
    }

}
