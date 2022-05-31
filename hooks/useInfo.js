import { useState } from "react";
import { getFromLocal, saveToLocal } from "../lib/web-storage";

import LastFmApi from "../lib/lastfm-api";
import WikipediaApi from "../lib/wikipedia-api";
import TextHelper from "../lib/text-helper";

function useInfo(noData) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  async function showInfo(artist, album) {
    if (loading) return;

    setLoading(true);
    setData(null);
    setVisible(true);

    const info = await getInfo(artist, album);
    setData(info);
    setLoading(false);

    if (!info) {
      hideInfo();
      noData("No information is available for this album or artist");
    }
  }

  function hideInfo() {
    setVisible(false);
  }

  async function getInfo(artist, album) {
    const cache = getFromLocal("info") || {};
    const key = artist + "," + album;

    if (key in cache) {
      return cache[key];
    }

    const info = await fetchInfo(artist, album);

    // console.log("Info", info);
    if (info) {
      info.text = extractSummary(info);
      // @ts-ignore
      info.api = info.api.apiName;
    }

    cache[key] = info;
    // saveToLocal("info", cache);

    return info;
  }

  async function fetchInfo(artist, album) {
    const apis = [
      new LastFmApi(artist, album),
      new WikipediaApi(artist, album),
    ];

    for (const api of apis) {
      const albumInfo = await api.getAlbumInfo();
      if (albumInfo && albumInfo.text) {
        return albumInfo;
      }
    }

    for (const api of apis) {
      const artistInfo = await api.getArtistInfo();
      if (artistInfo && artistInfo.text) {
        return artistInfo;
      }
    }

    return null;
  }

  function extractSummary(info) {
    const textHelper = new TextHelper(info.text);
    return textHelper.extractSummary({
      maxChars: 600,
      maxSentences: 5,
      nextSectionDelimiter: info.api.stripAfter,
    });
  }

  return {
    info: data,
    infoVisible: visible,
    infoIsLoading: loading,
    showInfo,
    hideInfo,
  };
}

export default useInfo;
