export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    public token?: string;
    public accessToken?: string;
}