const SYNONYMS = [
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
];

export default class Artist {
  constructor(artist, album) {
    this.artist = artist;
    this.title = this.artist;
  }

  searchSpecificTitle(text) {
    const artist = this.artist;

    for (const synonym of SYNONYMS["artist"]) {
      const suffix = new RegExp(`${artist} \\(${synonym}\\)`, "i").exec(text);
      if (suffix) {
        return suffix[0];
      }
    }

    return null;
  }
}
