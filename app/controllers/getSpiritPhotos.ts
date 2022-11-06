import { getQuery } from "https://deno.land/x/oak@v11.1.0/helpers.ts";
import metadata from "../lib/metadata.ts";
import helpers from "../lib/helpers.ts";

export default function getSpiritPhotos(ctx: any) {
  const params: Record<string, string> = getQuery(ctx);
  let solRange: number[] | undefined = undefined;
  let solCollection: number[] | undefined = undefined;
  let cameras: string[] | undefined = undefined;

  if (params.sol != undefined)
    if (params.sol.match(/\[\d*:\d*\]/)?.length != null)
      solRange = helpers.solQueryDecode(params.sol, ":");
    else if (params.sol.match(/\[(\d+)(,\s*\d+)*\]/))
      solCollection = helpers.solQueryDecode(params.sol, ",");

  if (params.cameras != undefined)
    cameras = helpers.camerasQueryDecode(params.cameras);

  type Field = { sol: number; camera: string; url: string };

  const requestedData: Array<Field> = [];

  let sols: number[];
  if (solCollection != undefined) sols = solCollection;
  else if (solRange != undefined) {
    if (solRange[1] == 0) solRange[1] = metadata.spirit().last_sol;
    sols = helpers.range(solRange[0], solRange[1]);
  } else sols = helpers.range(0, metadata.spirit().total_sols);

  for (const sol of sols)
    if (ctx.app.state.spirit[sol] != undefined)
      Object.entries(ctx.app.state.spirit[sol])
        .map(([key, value]) => {
          const urls: Array<Field> = (value as Array<string>).map((url) => {
            return { sol: sol, camera: key, url: url };
          });
          return urls.flat().filter((item) => {
            if (cameras?.includes(item.camera)) return item;
          });
        })
        .flat()
        .forEach((item) => {
          requestedData.push(item);
        });

  // if ("per_page" in params /* If photos limit provided */ )
  // console.log(requestedData);
  ctx.response.body = requestedData;
}
