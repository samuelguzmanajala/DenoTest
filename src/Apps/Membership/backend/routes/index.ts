import {Router} from "../../../../dependencies/deps.ts";
import {getFilesList} from "./FilterRoutes.ts";

export async function registerRoutes(router: Router) {
    const __dirname = new URL(".", import.meta.url).pathname;
    const routes = await getFilesList(__dirname, {extension: 'route.ts'});
    routes.map(route => {
        register(route, router);
    })
}
async function register(routePath: string, router: Router) {
    const route = await import(routePath);
    route.register(router);
}