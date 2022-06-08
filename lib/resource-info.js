import LastFmApi from "./lastfm-api";
import WikipediaApi from "./wikipedia-api";

export default class ResourceInfo {
  constructor(resource) {
    this.resource = resource;
    this.wikipedia = new WikipediaApi();
    this.lastfm = new LastFmApi();
  }

  async getFromWikipedia() {
    const pageTitle = this.resource.title;
    let page = await this.wikipedia.getPage(pageTitle);

    if (this.isDisambiguation(page.text)) {
      const specificTitle = this.resource.searchSpecificTitle(page.text);
      if (specificTitle) {
        return await this.wikipedia.getPage(specificTitle);
      } else {
        return null;
      }
    }

    if (this.isNotRelated(page.text)) {
      return null;
    }

    return page;
  }

  isDisambiguation(text) {
    return /may( also)? refer to/.test(text);
  }

  isNotRelated(text) {
    if (typeof text !== "string") return true;

    const capitalizedTitle = this.resource.title;
    return !text.includes(capitalizedTitle);
  }

  async getFromLastFm() {
    let page;
    if (this.resource.album) {
      page = await this.lastfm.getAlbumPage(
        this.resource.artist,
        this.resource.album
      );
    } else {
      page = await this.lastfm.getArtistPage(this.resource.artist);
    }

    if (!page.text) {
      return null;
    }

    return page;
  }
}
