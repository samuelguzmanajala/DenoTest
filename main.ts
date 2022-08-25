import { Application, Context } from "oak/mod.ts";

const app = new Application();
app.use((ctx: Context) => {
  ctx.response.body = "Hello World! with oak 3 prueba";
});
await app.listen({ port: 3000 });
