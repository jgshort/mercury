import { config } from "./config/dev.ts";

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

const appHandler = () => {
  let methods : any = [];
  return {
    get: (path: string, action: any) => {
      if(!methods['GET']) { methods['GET'] = []; }
      methods['GET'][path] = action;
    },
    handle: async (requestEvent: any) => {
      const request = requestEvent.request;
      const method = methods[request.method];
      let action = null;
      const parsedUrl = parsedPathName(request.url).toLowerCase();
      if(method) {
        action = method[parsedUrl];
      }
      if(action) {
        console.log(`Processing request ${parsedUrl}`);
        await action(requestEvent, request)
      } else {
        await requestEvent.respondWith(NotFound);
      }
    }
  }
};

const getConfig = async (requestEvent: Deno.RequestEvent, request: Request) => (
  await requestEvent.respondWith(createJsonResponse(config))
);

const getHelloWorld = async (requestEvent: Deno.RequestEvent, request: Request) => (
  await requestEvent.respondWith(new Response("Hello, World", { status: 200 }))
);

const getHealth = async (requestEvent: Deno.RequestEvent, request: Request) => (
  await requestEvent.respondWith(":)", { status: 200 })
);

const app = appHandler();

app.get('/', getHelloWorld);
app.get('/health', getHealth);

if(config.isDev) { app.get('/config', getConfig); }

async function handle(conn: Deno.Conn) {
  const connection = Deno.serveHttp(conn);
  try {
    for await (const requestEvent of connection) {
      await app.handle(requestEvent);
    }
  } catch(err) {
    if(config.isDev) {
      console.log(err);
    } else {
      throw err;
    }
  }
}

const serverConfig = config.server;
const server = Deno.listenTls(serverConfig);
console.log(`https://localhost:${config.server.port}/`);

for await (const conn of server) {
  handle(conn);
}
