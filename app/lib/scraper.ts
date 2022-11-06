// No need to rewrite it has the job done
import { load } from "https://esm.sh/cheerio@1.0.0-rc.12";
import helpers from "./helpers.ts";

export interface scraperOptions {
  url: string;
  sol?: number[];
  from?: number;
  to?: number;
  cameras?: string[];
}
interface Sol {
  FHAZ: string[];
  RHAZ: string[];
  NAVCAM: string[];
  PANCAM: string[];
  MICRO: string[];
}
type Sol_Key = keyof Sol;

type Data = Record<number, Sol>;

async function ScraperSpirit() {
  const url = `https://mars.nasa.gov/mer/gallery/all/spirit.html`;
  const html = await (await fetch(url)).text();
  const $ = load(html);

  const cams = new Object({
    FHAZ: "#Engineering_Cameras_Front_Hazcam",
    RHAZ: "#Engineering_Cameras_Rear_Hazcam",
    NAVCAM: "#Engineering_Cameras_Navigation_Camera",
    PANCAM: "#Engineering_Cameras_Panoramic_Camera",
    MICRO: "#Engineering_Cameras_Microscopic_Imager",
  });

  const pages: Sol = {
    FHAZ: [],
    RHAZ: [],
    NAVCAM: [],
    PANCAM: [],
    MICRO: [],
  };

  Object.entries(cams).forEach(([key, value]) => {
    $(value)
      .find("option")
      .each((_i, option) => {
        pages[key as Sol_Key].push(String($(option).attr("value")));
      });
  });

  type Data = Record<number, Sol>;
  const data: Data = {};

  Object.entries(pages).forEach(async ([cam, pages]) => {
    for (const i in pages) {
      const sol = Number(pages[i].match(/\d+/)[0]);
      const sol_html = await (
        await fetch(`https://mars.nasa.gov/mer/gallery/all/${pages[i]}`)
      ).text();
      const $$ = load(sol_html);
      $$("table[cellspacing='4'][cellpadding='6'][border='0'][align='center']")
        .find("img")
        .each((_i, img) => {
          const link = $$(img).attr("src");
          if (!link?.endsWith(".gif")) {
            if (!(sol in data)) {
              // console.log(`cam: ${cam}, sol; ${sol}, link: ${link}\n`);
              data[sol] = {
                FHAZ: [],
                RHAZ: [],
                NAVCAM: [],
                PANCAM: [],
                MICRO: [],
              };
            }
            data[sol][cam as Sol_Key].push(
              "https://mars.nasa.gov/mer/gallery/all/" + link
            );
            // console.log(data[sol][cam as Sol_Key]);
          }
        });
    }
    /*
      FIXME: I place this code here because outside of this foreach callback function
      this code was executing async. But we need to wait all the scrap processes done until writing the result down in the file.
      Just take the file with PANCAM in the title, beautify it and remove -THM in urls globaly (sed -e s/-THM//g -i SpiritPANCAM.json)
    */
    console.log("Data downloaded. Start writing the file");
    helpers.writeJson(`./Spirit_${cam}.json`, data);
    console.log("Write finished");
  });
}

async function ScraperOpportunity() {
  const url = `https://mars.nasa.gov/mer/gallery/all/opportunity.html`;
  const html = await (await fetch(url)).text();
  const $ = load(html);

  const cams = new Object({
    FHAZ: "#Engineering_Cameras_Front_Hazcam",
    RHAZ: "#Engineering_Cameras_Rear_Hazcam",
    NAVCAM: "#Engineering_Cameras_Navigation_Camera",
    PANCAM: "#Science_Cameras_Panoramic_Camera",
    MICRO: "#Science_Cameras_Microscopic_Imager",
  });

  const pages: Sol = {
    FHAZ: [],
    RHAZ: [],
    NAVCAM: [],
    PANCAM: [],
    MICRO: [],
  };

  Object.entries(cams).forEach(([key, value]) => {
    $(value)
      .find("option")
      .each((_i, option) => {
        pages[key as Sol_Key].push(String($(option).attr("value")));
      });
  });

  const data: Data = {};

  Object.entries(pages).forEach(async ([cam, pages]) => {
    for (const i in pages) {
      const sol = Number(pages[i].match(/\d+/)[0]);
      const sol_html = await (
        await fetch(`https://mars.nasa.gov/mer/gallery/all/${pages[i]}`)
      ).text();
      const $$ = load(sol_html);
      $$("table[cellspacing='4'][cellpadding='6'][border='0'][align='center']")
        .find("img")
        .each((_i, img) => {
          const link = $$(img).attr("src");
          if (!link?.endsWith(".gif")) {
            if (!(sol in data)) {
              // console.log(`cam: ${cam}, sol; ${sol}, link: ${link}\n`);
              data[sol] = {
                FHAZ: [],
                RHAZ: [],
                NAVCAM: [],
                PANCAM: [],
                MICRO: [],
              };
            }
            data[sol][cam as Sol_Key].push(
              "https://mars.nasa.gov/mer/gallery/all/" + link
            );
            // console.log(data[sol][cam as Sol_Key]);
          }
        });
    }
    /*
      FIXME: I place this code here because outside of this foreach callback function
      this code was executing async. But we need to wait all the scrap processes done until writing the result down in the file.
      Just take the file with PANCAM in the title, beautify it and remove -THM in urls globaly (sed -e s/-THM//g -i OpportunityPANCAM.json)
    */
    console.log("Data downloaded. Start writing the file");
    helpers.writeJson(`./Opportunity${cam}.json`, data);
    console.log("Write finished");
  });
}

// ScraperOpportunity();
// ScraperSpirit();
