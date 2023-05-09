import { Application, Router } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { config } from "./config/dev.ts";
import health from "./server/v1/health/index.ts";

const NotFound = new Response('Not Found', { status: 404 });

const parsedPathName = (url: string) => {
  const parsedUrl = new URL(url);
  return parsedUrl.pathname;
}

const createJsonResponse = (json: any, responseCode = 202) => (
  new Response(JSON.stringify(json), {
    status: responseCode,
    headers: {
      'content-type': 'application/json'
    }
  })
);

const getConfig = async (context: any) => {
  context.response.body = config;
};

const app = new Application();
app.addEventListener("error", (evt) => {
  console.log(evt.error);
});

const router = new Router();
router
  .get('/api/v1/config', getConfig);

app.use(router.routes());
app.use(router.allowedMethods());

app.use(health.routes());

app.listen(config.server);
