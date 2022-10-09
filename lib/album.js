const SYNONYMS = [
  "album",
  "single",
  "record",
  "release",
  "soundtrack",
  "collection",
];

export default class Album {
  constructor(artist, album) {
    this.artist = artist;
    this.album = album;
    this.title = this.album;
  }

  searchSpecificTitle(text) {
    const album = this.album;
    const artist = this.artist;

    // [Album Title] ([Artist Name] album)
    const albumArtistSuffix = new RegExp(
      `${album} \\(${artist} album\\)`,
      "i"
    ).exec(text);
    if (albumArtistSuffix) {
      return albumArtistSuffix[0];
    }

    // [Album Title] (album)
    const albumSuffix = new RegExp(`${album} \\(album\\)`, "i").exec(text);
    if (albumSuffix) {
      return albumSuffix[0];
    }

    return null;
  }
}
