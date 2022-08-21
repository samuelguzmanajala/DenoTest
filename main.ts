import {Application} from "https://deno.land/x/oak@v11.0.0/mod.ts";
const app = new Application();
app.use((ctx) => {
  ctx.response.body = "Hello World! with oak";
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