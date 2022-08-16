import {UsersFinder} from "./UsersFinder.ts";
import {QueryHandler} from "../../../../Shared/domain/QueryHandler.ts";
import {UsersResponse} from "../UsersRespone.ts";
import {SearchAllUsersQuery} from "./SearchAllUsersQuery.ts";
import {Query} from "../../../../Shared/domain/Query.ts";

export class SearchAllUsersQueryHandler  implements QueryHandler<SearchAllUsersQuery, UsersResponse>{
    constructor(private usersFinder: UsersFinder) {}

    subscribedTo(): Query {
        return SearchAllUsersQuery;
    }

    async handle(_query: SearchAllUsersQuery): Promise<UsersResponse> {
        return this.usersFinder.run();
    }


}