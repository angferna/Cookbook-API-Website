import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Users} from '../interfaces/users';
import {User} from "../interfaces/user";

@Injectable()
export class UserService {
    static parameters = [HttpClient];
    constructor(private httpClient: HttpClient) {
        this.httpClient = httpClient;
    }
    getAllUsers(): Promise<Users> {
        return this.httpClient
            .get<Users>('/api/users')
            .toPromise();
    }

    getUserById(userId): Promise<User> {
        let url = `/api/users/${userId}`;
        return this.httpClient
            .get<User>(url)
            .toPromise();
    }
}
