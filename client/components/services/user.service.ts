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
    getAllUsers(): Promise<User[]> {
        return this.httpClient
            .get<User[]>('/api/users')
            .toPromise();
    }

    getUserById(userId): Promise<User> {
        let url = `/api/users/${userId}`;
        return this.httpClient
            .get<User>(url)
            .toPromise();
    }

    updateUser(user: User): Promise<User> {
        return this.httpClient
            .put<User>(`/api/users/${user._id}`, user)
            .toPromise();
    }
    createUser(user: User): Promise<User> {
        return this.httpClient
            .post<User>(`/api/users`, user)
            .toPromise();
    }
}
