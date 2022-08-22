import {Router} from 'oak/mod.ts';
import {getFilesList} from "./FilterRoutes.ts";

export async function registerRoutes(router: Router):Promise<void> {
    const __dirname = new URL(".", import.meta.url).pathname;
    const routes = await getFilesList(__dirname, {extension: 'route.ts'});
    routes.map((route:string) => register(route, router));
}
async function register(routePath: string, router: Router):Promise<void> {
    const route = await import(routePath);
    await route.register(router);
   console.log('hola');
}