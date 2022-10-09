import { ApiError } from "./errors";
import fetcher from "./fetcher";

export default class WikipediaApi {
  static instance;

  constructor() {
    if (WikipediaApi.instance) {
      return WikipediaApi.instance;
    } else {
      WikipediaApi.instance = this;
    }
  }

  async getPage(title) {
    const page = new WikipediaPage(title);
    try {
      await page.getText();
      return page;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else {
        throw new ApiError("Unable to get wikipedia page");
      }
    }
  }
}

class WikipediaPage {
  API_URL = "https://en.wikipedia.org/w/api.php";
  API_NAME = "Wikipedia";

  constructor(title) {
    this.title = title;
    this.path = this.makePath(this.title);
    this.url = this.makeURL(this.path);
    this.link = this.makeLink(this.path);
    this.text = null;
  }

  async getText() {
    const data = await this.getJSON();

    const pages = data.query.pages;
    const key = Object.keys(pages)[0];
    const text = pages[key].extract;

    this.text = text;
  }

  async getJSON() {
    const response = await fetcher(this.url);
    if (response.status !== 200) {
      throw new ApiError("Response status not 200");
    }

    return await response.json();
  }

  makeURL(path) {
    const url = new URL(this.API_URL);
    const params = {
      origin: "*",
      action: "query",
      titles: path,
      format: "json",
      prop: "extracts",
      explaintext: true,
      redirects: true,
    };
    // @ts-ignore
    url.search = new URLSearchParams(params).toString();

    return url;
  }

  makePath(title) {
    return title.split(" ").join("_");
  }

  makeLink(path) {
    return "https://en.wikipedia.org/wiki/" + path;
  }
}
