import fetcher from "./fetcher";

const GENRES = {
  Acoustic: ["acoustic", "guitar"],
  Afrobeat: ["afrobeat"],
  Alternative: ["alt-rock", "alternative", "folk", "indie", "new-age"],
  "Blues & Jazz": ["blues", "jazz"],
  Brazilian: ["bossanova", "brazil", "samba", "mpb", "forro"],
  Classical: ["classical", "opera", "piano"],
  Country: ["country"],
  Disco: ["dance", "dancehall", "disco"],
  Electronic: ["edm", "electronic", "house", "techno", "trance"],
  French: ["french"],
  Goth: ["goth"],
  "Hip-hop & RnB": ["hip-hop", "r-n-b"],
  Japanese: ["j-dance", "j-idol", "j-pop", "j-rock"],
  Latin: ["latin", "latino", "reggaeton", "salsa", "tango"],
  Metal: ["black-metal", "death-metal", "heavy-metal", "metal"],
  Pop: ["indie-pop", "pop", "pop-film", "power-pop", "synth-pop"],
  Punk: ["punk", "punk-rock"],
  Reggae: ["reggae"],
  Rock: ["alt-rock", "hard-rock", "punk-rock", "rock", "rock-n-roll"],
  Spanish: ["spanish"],
};

class SpotifyApi {
  _API_URL = "https://api.spotify.com/v1";
  static _instance;

  constructor(token) {
    if (SpotifyApi._instance) {
      return SpotifyApi._instance;
    } else {
      SpotifyApi._instance = this;
    }

    this._token = token;
    this._market = "PT";
  }

  async getRecommendedAlbums(genre) {
    const genres = GENRES[genre];
    if (!genres) {
      this._throwError("Invalid genre for fetching albums");
    }

    const response = await this._getEndpointWithParams("/recommendations", {
      seed_genres: genres.join(","),
      market: this._market,
      limit: 30,
    });

    if (response?.tracks) {
      return this._extractAlbumsListFromTracks(response.tracks);
    } else {
      this._throwError("Could not get recommended albums for the genre");
    }
  }

  async _extractAlbumsListFromTracks(tracks) {
    try {
      const albums = tracks
        .filter(({ album }) => album.album_type === "ALBUM")
        .map(({ album, preview_url }) => ({
          spotifyId: album.id,
          type: album.album_type,
          albumName: album.name,
          albumURL: album.external_urls.spotify,
          coverURL: album.images[0].url,
          artistName: album.artists[0].name,
          artistURL: album.artists[0].external_urls.spotify,
          releaseDate: album.release_date,
          previewURL: preview_url,
        }));

      return albums;
    } catch (error) {
      this._throwError("Could not extract albums from tracks");
    }
  }

  _getEndpointWithParams(endpoint, params) {
    const url = this._makeURLWithParams(endpoint, params);
    return this._getJSON(url);
  }

  _getJSON(url) {
    return this._fetchAPIWithToken(url)
      .then((response) => this._handleResponseErrors(response))
      .then((response) => response.json());
  }

  _handleResponseErrors(response) {
    switch (response?.status) {
      case 200:
        return response;
      case 401:
        this._throwError("Invalid or expired token", 401);
        break;
      case 403:
        this._throwError("Bad OAuth request", 403);
        break;
      case 409:
        this._throwError("App has exceed its rate limit", 409);
        break;
      default:
        this._throwError("Unknown error while trying to fetch", 0);
    }
  }

  _fetchAPIWithToken(url, config = {}) {
    return fetcher(url, {
      ...config,
      headers: {
        Authorization: `Bearer ${this._token}`,
      },
    });
  }

  _makeURLWithParams(endpoint, params) {
    if (endpoint[0] !== "/") {
      this._throwError("The endpoint must start with a forward slash ('/')");
    }

    const url = new URL(this._API_URL + endpoint);

    if (Object.keys(params).length > 0) {
      url.search = new URLSearchParams(params).toString();
    }

    return url;
  }

  _throwError(message, status = null) {
    throw {
      message: `Spotify API: ${message}`,
      status,
    };
  }

  static getGenres() {
    return Object.keys(GENRES);
  }

  static getRandomGenre() {
    const genres = SpotifyApi.getGenres();
    const randomIndex = Math.floor(Math.random() * genres.length);
    return genres[randomIndex];
  }
}

export default SpotifyApi;
