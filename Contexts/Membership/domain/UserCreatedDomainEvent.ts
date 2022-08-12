import {DomainEvent} from "../../Shared/domain/DomainEvent.ts";

type CreateUserDomainEventBody = {
    readonly id: string;
    readonly name: string;
    readonly password: string;
    readonly mail: string;
    readonly eventName: string;
}

export class UserCreatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME = "user.created";
    readonly name: string;
    readonly mail: string;
    readonly password: string;

    constructor({
        id,
        name,
        password,
        mail,
        eventId,
        occurredOn,
    }:{
        id: string;
        name: string;
        password: string;
        mail: string;
        eventId?: string;
        ocurredOn?: Date;
    }) {
        super(UserCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
        this.name = name;
        this.mail = mail;
        this.password = password;
    }

    toPrimitive(): CreateUserDomainEventBody {
        const {name, password, mail, aggregateId} = this;
        return {
            name,
            password,
            mail,
            eventName: UserCreatedDomainEvent.EVENT_NAME,
            id: aggregateId
        };
    }

    static fromPrimitives(
                              aggregateId,
                              body,
                              eventId,
                              occurredOn
    ): DomainEvent {
        return new UserCreatedDomainEvent({
            id: aggregateId,
            name: body.name,
            password: body.password,
            mail: body.mail,
            eventId,
            occurredOn,
        });
    }
}