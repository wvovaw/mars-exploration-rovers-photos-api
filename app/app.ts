import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import spiritRouter from "./routes/get.spirit.ts";
import opportunityRouter from "./routes/get.opportunity.ts";
import helpers from "./lib/helpers.ts";

const app: Application = new Application();

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Response timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Error logs
app.addEventListener("error", (error) => {
  console.log(error);
});

// Routes
app.use(spiritRouter.routes());
app.use(spiritRouter.allowedMethods());
app.use(opportunityRouter.routes());
app.use(opportunityRouter.allowedMethods());

// Load large files once and make them available throughout the app
app.state.spirit = helpers.readJson("./static/Spirit.json");
app.state.opportunity = helpers.readJson("./static/Spirit.json");

export default app;
