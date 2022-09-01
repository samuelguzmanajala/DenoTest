export const Types = {
  DI: Symbol("DI"),
  UserRepository: Symbol("UserRepository"),
  EventBus: Symbol("EventBus"),
  Logger: Symbol("Logger"),
  MongoConfig: Symbol("MongoConfig"),
  rabbitConfig: Symbol('RabbitConfig'),
  Client: Symbol("Client"),
  Subscribers: Symbol("Subscribers"),
  commandBus: Symbol("CommandBus"),
  commandHandlersInformation: Symbol("CommandHandlersInformation"),
  createUserCommandHandler: Symbol("CreateUserCommandHanlder"),
  commandHandler: Symbol("CommandHandler"),
  domainEventSubscriber: Symbol('domainEventSubscriber'),
  emailSender: Symbol('EmailSender'),
  sendWelcomeUserEmail: Symbol('SendWelcomeUserEmail'),
  sendWelcomeUserEmailOnUserRegistered: Symbol('SendWelcomeUserEmailOnUserRegistered'),
  userPutController: Symbol('UserPutController')
};
