export default {
  solQueryDecode: (solQuery: string, delimeter: string): number[] | undefined =>
    solQuery != undefined && solQuery.length > 2
      ? solQuery
          .substring(1, solQuery.length - 1)
          .split(delimeter)
          .map((item: string): number => Number(item))
          .sort((a, b) => (delimeter == ":" ? 0 : a - b))
      : undefined,

  camerasQueryDecode: (camerasQuery: string): string[] | undefined =>
    camerasQuery != undefined && camerasQuery.length > 2
      ? camerasQuery.substring(1, camerasQuery.length - 1).split(",")
      : undefined,

  writeJson: (path: string, data: Record<string, unknown>): string => {
    try {
      Deno.writeTextFileSync(path, JSON.stringify(data));
      return "Written to " + path;
    } catch (e) {
      return e.message;
    }
  },

  readJson: async (path: string) => {
    try {
      return await JSON.parse(await Deno.readTextFile(path));
    } catch (e) {
      return e.message;
    }
  },

  range: (start: number, end: number) =>
    [...Array(1 + end - start).keys()].map((item) => item + start),

  paginate: (arr: any[], per_page: number, page: number): any[] =>
    arr.slice((page - 1) * per_page, page * per_page),
};
