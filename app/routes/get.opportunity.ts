import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const router = new Router();

router.get("/opportunity", (ctx) => {
  const params = ctx.params;
  console.log(params);
  ctx.response.body = "Opportunity photos";
});

export default router;
