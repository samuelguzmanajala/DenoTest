import {Router} from "../../../../dependencies/deps.ts";
import {getFilesList} from "./FilterRoutes.ts";

export function registerRoutes(router: Router) {
    const __dirname = new URL(".", import.meta.url).pathname;
    getFilesList(__dirname, {extension: 'route.ts'}).then((routes) => {
        routes.map((route:string) => register(route, router));
    })
}
async function register(routePath: string, router: Router):Promise<void> {
    const route = await import(routePath) as Router;
    await route.register(router);
}