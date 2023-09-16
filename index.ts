// index.ts

// Import the Oak module and the send function from the Deno standard library
import { Application, Router, send } from 'https://deno.land/x/oak/mod.ts';
import { open } from "https://deno.land/x/open@v0.0.6/index.ts";

// Create an instance of the Oak application and a router
const app = new Application();
const router = new Router();

// Use the router to handle requests to your site
router.get('/', async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/static`,                                                                                index: "index.html",
  });
});

// Use the app to register the router as middleware and listen for requests on a port
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });

await open('http://localhost:8000', { wait: false });

// Run an echo command from Deno using the Deno.run method
Deno.run({
  cmd: ["echo", "hello world"]
});
