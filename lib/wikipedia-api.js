export default class WikipediaApi {
  _API_URL = "https://en.wikipedia.org/w/api.php";

  _SYNONYMS = {
    artist: [
      "artist",
      "singer",
      "band",
      "group",
      "musician",
      "songwriter",
      "vocalist",
      "performer",
      "player",
      "guitarist",
      "pianist",
      "saxophonist",
      "violinist",
    ],
    album: ["album", "single", "record", "release", "soundtrack", "collection"],
  };

  static apiName = "Wikipedia";
  static stripAfter = "==";

  constructor(artist, album) {
    this._artist = artist;
    this._album = this._stripParenthesis(album);
  }

  async getAlbumInfo() {
    let info = await this._getInfo(this._album);

    if (this._isAmbiguous(info)) {
      const unambiguousTitle = this._extractAlbumUnambiguousTitle(info.text);
      if (unambiguousTitle) {
        return await this._getInfo(unambiguousTitle);
      }
    } else if (this._isInfoRelated(info)) {
      return info;
    }

    return null;
  }

  async getArtistInfo() {
    let info = await this._getInfo(this._artist);

    if (this._isAmbiguous(info)) {
      const unambiguousTitle = this._extractArtistUnambiguousTitle(info.text);
      if (unambiguousTitle) {
        return await this._getInfo(unambiguousTitle);
      }
    } else if (this._isInfoRelated(info)) {
      return info;
    }

    return null;
  }

  async _getInfo(resourceTitle) {
    const pageTitle = this._toWikipediaTitle(resourceTitle);
    const text = await this._fetchPageText(pageTitle);

    if (text) {
      return {
        text,
        more: this._toWikipediaLink(pageTitle),
        api: WikipediaApi,
      };
    } else {
      return null;
    }
  }

  async _fetchPageText(titles) {
    const url = new URL(this._API_URL);

    const params = {
      origin: "*",
      action: "query",
      titles,
      format: "json",
      prop: "extracts",
      explaintext: true,
      redirects: true,
    };

    // @ts-ignore
    url.search = new URLSearchParams(params).toString();

    try {
      // @ts-ignore
      const response = await fetch(url);
      const data = await response.json();

      const pages = data.query.pages;
      const key = Object.keys(pages)[0];
      const extract = pages[key].extract;

      return extract;
    } catch (error) {
      console.log(error);
      this._throwError("Unable to fetch wikipedia page text");
    }
  }

  _extractAlbumUnambiguousTitle(text) {
    const album = this._album;

    const albumArtistSuffix = new RegExp(
      `${album} \\(${this._artist} album\\)`,
      "i"
    ).exec(text);
    if (albumArtistSuffix) {
      return albumArtistSuffix[0];
    }

    const albumSuffix = new RegExp(`${album} \\(album\\)`, "i").exec(text);
    if (albumSuffix) {
      return albumSuffix[0];
    }

    return null;
  }

  _extractArtistUnambiguousTitle(text) {
    const artist = this._artist;

    for (const synonym of this._SYNONYMS["artist"]) {
      const suffix = new RegExp(`${artist} \\(${synonym}\\)`, "i").exec(text);
      if (suffix) {
        console.log(suffix[0]);
        return suffix[0];
      }
    }

    return null;
  }

  _isAmbiguous(info) {
    return info && / may( also)? refer to/.test(info.text);
  }

  _isInfoRelated(info) {
    if (!info) return null;

    return info.text.includes(this._album) || info.text.includes(this._artist);
  }

  _stripParenthesis(str) {
    const parenthesisIndex = str.indexOf("(");
    if (parenthesisIndex === -1) {
      return str;
    } else {
      return str.slice(0, parenthesisIndex).trim();
    }
  }

  _toWikipediaTitle(str) {
    return str.split(" ").join("_");
  }

  _toWikipediaLink(pageTitle) {
    return "https://en.wikipedia.org/wiki/" + pageTitle;
  }

  _throwError(message, status = null) {
    throw {
      message: `Wikipedia API: ${message}`,
      status,
    };
  }
}
