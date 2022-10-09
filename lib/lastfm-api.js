import { ApiError } from "./errors";
import fetcher from "./fetcher";

export default class LastFmApi {
  static instance;

  constructor() {
    if (LastFmApi.instance) {
      return LastFmApi.instance;
    } else {
      LastFmApi.instance = this;
    }
  }

  getAlbumPage(artist, album) {
    const page = new LastFmAlbumPage(artist, album);
    return this.getPageText(page);
  }

  getArtistPage(artist) {
    const page = new LastFmArtistPage(artist);
    return this.getPageText(page);
  }

  async getPageText(page) {
    try {
      await page.getText();
      return page;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else {
        throw new ApiError("Unable to get last.fm page");
      }
    }
  }
}

class LastFmPage {
  API_URL = "https://ws.audioscrobbler.com/2.0/";
  // public for the sake of simplicity
  API_KEY = "b29132ec52540af9b2a32b51d800a0bd";
  API_NAME = "Last.fm";

  constructor(params) {
    this.params = params;
    this.url = this.makeURL(this.params);
    this.text = null;
    this.link = null;
  }

  async getJSON() {
    const response = await fetcher(this.url);
    if (response.status !== 200) {
      throw new ApiError("Response status not 200");
    }

    return await response.json();
  }

  makeURL(params) {
    const defaultParams = {
      api_key: this.API_KEY,
      format: "json",
    };

    const url = new URL(this.API_URL);
    url.search = new URLSearchParams({
      ...defaultParams,
      ...params,
    }).toString();

    return url;
  }
}

class LastFmAlbumPage extends LastFmPage {
  constructor(artist, album) {
    const params = {
      method: "album.getInfo",
      artist: artist,
      album: album,
    };
    super(params);

    this.title = album;
  }

  async getText() {
    const data = await this.getJSON();

    const text = data?.album?.wiki?.content;
    const link = data?.album?.url;

    this.text = text;
    this.link = link;
  }
}

class LastFmArtistPage extends LastFmPage {
  constructor(artist) {
    const params = {
      method: "artist.getInfo",
      artist: artist,
    };
    super(params);

    this.title = artist;
  }

  async getText() {
    const data = await this.getJSON();

    const text = data?.artist?.bio?.content;
    const link = data?.artist?.bio?.links?.link?.href;

    this.text = text;
    this.link = link;
  }
}
