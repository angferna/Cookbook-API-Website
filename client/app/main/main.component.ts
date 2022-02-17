import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../components/services/user.service';
import {User} from '../../components/interfaces/User';

@Component({
    selector: 'main',
    templateUrl: './main.html',
    styleUrls: ['./main.scss'],
})
export class MainComponent implements OnInit {

    public values: string[];
    public valueToSquare: number;
    public users: User[];
    public input: string;
    static parameters = [HttpClient, UserService];

    constructor(private http: HttpClient, private userService: UserService) {
        this.http = http;
        this.userService = userService;
        this.setData();
        this.getUserData();
    }

    private setData() {
        this.values = ['first', 'second', 'third'];
        this.valueToSquare = 4;
    }

    public getUserData() {
        this.userService.getAllUsers()
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
    }
}
