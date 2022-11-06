import { getQuery } from "https://deno.land/x/oak@v11.1.0/helpers.ts";
import metadata from "../lib/metadata.ts";
export default function getSpiritMetadata(ctx: any) {
  const params = getQuery(ctx);
  ctx.response.body = metadata[params.rover as keyof typeof metadata];
}
