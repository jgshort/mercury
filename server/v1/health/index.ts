import { Router } from "https://deno.land/x/oak@v9.0.0/mod.ts";

const health = async (context : any) => {
  context.response.body = ':)';
};

const router = new Router();
router.get('/api/v1/health', health);

export default router;
