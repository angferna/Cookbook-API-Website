export interface User {
    _id: string;
    name: {
        _id: string,
        firstName: string,
        middleName: string,
        lastName: string
    };
    address: {
        _id: string,
        addressLine1: string,
        addressLine2: string,
        city: string,
        state: string,
        zip: number,
        __v: number
    };
    age: number;
    __v: number;
}
