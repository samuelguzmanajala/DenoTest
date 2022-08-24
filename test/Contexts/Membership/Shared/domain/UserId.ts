import { UserId } from "../../../../../src/Contexts/Membership/Users/domain/value-object/UserId.ts";
import { UuidMother } from "../../../Shared/domain/UuidMother.ts";


export class UserIdMother {
    static create(value: string):UserId{
        return new UserId(value);
    }
    static random():UserId {
        return this.create(UuidMother.random());
    }
}