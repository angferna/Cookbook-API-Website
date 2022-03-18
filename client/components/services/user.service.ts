import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from '../interfaces/AuthUser';

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
    getUserById(userId): Promise<any> {
        return this.httpClient
            .get<any>(`/api/users/${userId}`)
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
