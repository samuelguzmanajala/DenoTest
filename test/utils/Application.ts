import { UserBackendApp } from "../../src/Apps/Membership/backend/UserBackendApp.ts";

export class Application {
    private static userBackendApp: UserBackendApp;

    static async start() {
        this.userBackendApp = new UserBackendApp();
        await this.userBackendApp.start();
    }
}