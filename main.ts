
import {Application} from "oak/mod.ts";
const app = new Application();
app.use((ctx) => {
  ctx.response.body = "Hello World! with oak 2";
});
await app.listen({port: 8000});
/*
import {serve} from 'https://deno.land/std@0.140.0/http/server.ts';

serve((_req)=>{
  return new Response('Hello World!', {
    headers: {"content-type": "text/plain"}
  });
});
*/