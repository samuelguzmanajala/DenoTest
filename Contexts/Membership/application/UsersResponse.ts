import {User} from "./domain/user.ts";

export class UsersResponse {
    readonly courses: Array<User>;

    constructor(courses: Array<User>) {
        this.courses = courses;
    }
}
