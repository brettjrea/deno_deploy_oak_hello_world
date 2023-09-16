// index.ts

// Import the Oak module and the send function from the$
import { Application, Router, send } from 'https://deno$
import { open } from "https://deno.land/x/open@v0.0.6/i$

// Create an instance of the Oak application and a rout$
const app = new Application();
const router = new Router();

// Use the router to handle requests to your site
router.get('/', async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/static`,
    index: "index.html",
  });
});

// Use the app to register the router as middleware and$
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
await open('http://localhost:8000', { wait: false });

// Run an echo command from Deno using the Deno.run met$
Deno.run({
  cmd: ["echo", "hello world"]
});
