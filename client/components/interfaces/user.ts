export interface User {
    _id: string;
    name: {
        _id: string,
        firstName: string,
        lastName: string
    };
    username: string;
    emailAddress: string;
    __v: number;
}
