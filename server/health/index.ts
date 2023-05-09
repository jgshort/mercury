import { Router } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { versionFromContext, versionDefinitions } from "../../lib/version.ts";

const health_1_0 = (version: number) => async (context : any) =>
  (context.response.body = { data: [ ':)' ], meta: { version }});

const v1_0 = {
  getHealth: health_1_0(1.0)
};

const definitions = versionDefinitions();
definitions.register(1.0, v1_0);

const health = async (context : any) => {
  const api = versionFromContext(context, definitions);
  if(api) {
    await api.getHealth(context);
  }
};

const router = new Router();
router.get('/api/:version/health', health);

export default router;
