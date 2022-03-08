import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../components/services/user.service';
import {User} from '../../components/interfaces/user';

@Component({
    selector: 'all-users',
    templateUrl: './allUsers.html',
    styleUrls: ['../main/main.scss'],
})
export class AllUsersComponent implements OnInit {

    public users: User[];
    static parameters = [HttpClient, UserService];

    constructor(private http: HttpClient, private userService: UserService) {
        this.http = http;
        this.userService = userService;
        this.getUserData();
    }

    public getUserData() {
        this.userService.getAllUsers()
            .then(response => {
                this.users = response as User[];
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Something has gone wrong', error);
        return Promise.reject(error.message || error);
    }

    ngOnInit() {
    }
}
