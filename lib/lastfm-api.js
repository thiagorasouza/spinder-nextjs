export default class LastFmApi {
  _API_URL = "https://ws.audioscrobbler.com/2.0/";
  _API_KEY = "b29132ec52540af9b2a32b51d800a0bd";

  static apiName = "Last.fm";
  static stripAfter = "<";

  constructor(artist, album) {
    this._artist = artist;
    this._album = album;

    this._defaultParams = {
      api_key: this._API_KEY,
      format: "json",
    };
  }

  getAlbumInfo() {
    const params = {
      method: "album.getInfo",
      artist: this._artist,
      album: this._stripParenthesis(this._album),
    };

    return this._getInfo(params);
  }

  getArtistInfo() {
    const params = {
      method: "artist.getInfo",
      artist: this._artist,
    };

    return this._getInfo(params);
  }

  async _getInfo(params) {
    console.log(params);
    const url = this._makeURLWithParams(params);

    const response = await this._fetchAPI(url);

    let data, link;
    if (params.method === "album.getInfo") {
      data = response?.album?.wiki?.content;
      link = response?.album?.url;
    } else if (params.method === "artist.getInfo") {
      data = response?.artist?.bio?.content;
      link = response?.artist?.bio?.links?.link?.href;
    }

    if (!data || !link) {
      return null;
    }

    return {
      text: data,
      more: link,
      api: LastFmApi,
    };
  }

  async _fetchAPI(url) {
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        return await response.json();
      } else {
        this._throwError("Invalid response status", response.status);
      }
    } catch (error) {
      console.log(error);
      this._throwError("Could not fetch the API");
    }
  }

  _stripParenthesis(str) {
    const parenthesisIndex = str.indexOf("(");
    if (parenthesisIndex === -1) {
      return str;
    } else {
      return str.slice(0, parenthesisIndex).trim();
    }
  }

  _makeURLWithParams(params) {
    const url = new URL(this._API_URL);
    url.search = new URLSearchParams({
      ...this._defaultParams,
      ...params,
    }).toString();

    return url;
  }

  _throwError(message, status = null) {
    throw {
      message: `Last.fm API: ${message}`,
      status,
    };
  }
}
