import {Application, Context} from "./src/dependencies/deps.ts";

const app = new Application();
app.use((ctx:Context) => {
  ctx.response.body = "Hello World!";
});
const listener = Deno.listen({port: 8000 });