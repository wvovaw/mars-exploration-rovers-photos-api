import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import getPhotos from "./routes/get.roverPhotos.ts";
import getMetadata from "./routes/get.roverMetadata.ts";
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
app.use(getPhotos.routes());
app.use(getPhotos.allowedMethods());
app.use(getMetadata.routes());
app.use(getMetadata.allowedMethods());

// Load large files once and make them available throughout the app
app.state.spirit = await helpers.readJson("./static/Spirit.json");
app.state.opportunity = await helpers.readJson("./static/Opportunity.json");

export default app;
