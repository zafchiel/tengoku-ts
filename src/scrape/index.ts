import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeAnime() {
  const { data } = await axios.get(
    "https://gogoanimehd.io/category/jigokuraku",
  );
  const jsn: any = {};
  const $ = cheerio.load(data);
  const one = $(".anime_info_body_bg")
    .find(".type")
    .each((_, el) => {
      const propertyName = $(el)
        .find("span")
        .text()
        .trim()
        .replace(":", "")
        .replace(" ", "-");
      $(el).find("span").remove();
      jsn[propertyName] = $(el).text().trim();
    });
  console.log(jsn);
}
