import { useState } from "react";
import { getFromLocal, saveToLocal } from "../lib/web-storage";

import TextHelper from "../lib/text-helper";
import ResourceInfo from "../lib/resource-info";
import Album from "../lib/album";
import Artist from "../lib/artist";
import { NetworkError } from "../lib/errors";

function useInfo(noData) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  async function showInfo(artist, album) {
    if (loading) return;

    setLoading(true);
    setData(null);
    setVisible(true);

    try {
      const info = await getInfo(artist, album);
      if (!info) {
        hideInfo();
        noData("No information is available for this album or artist.");
      } else {
        setData(info);
      }
    } catch (error) {
      console.log(error);
      hideInfo();
      noData("Unable to fetch the server at this moment");
    } finally {
      setLoading(false);
    }
  }

  function hideInfo() {
    setLoading(false);
    setVisible(false);
  }

  async function getInfo(artist, album) {
    const cache = getFromLocal("info") || {};
    const key = artist + "," + album;

    if (key in cache) {
      return cache[key];
    }

    const info = await fetchInfo(artist, album);
    console.log("Info", info);

    if (!info) {
      return null;
    }

    const infoObj = {
      text: extractSummary(info.text),
      more: info.link,
      api: info.API_NAME,
    };

    cache[key] = infoObj;
    saveToLocal("info", cache);

    return infoObj;
  }

  async function fetchInfo(artist, album) {
    console.log("Artist", artist);
    console.log("Album", album);

    const albumResource = new Album(artist, stripParenthesis(album));
    // console.log("Album Resource", albumResource);
    const albumInfo = await new ResourceInfo(albumResource);
    // console.log("Album Info", albumInfo);

    const artistResource = new Artist(artist);
    // console.log("Artist Resource", artistResource);
    const artistInfo = await new ResourceInfo(artistResource);
    // console.log("Artist Info", artistInfo);

    const fns = [
      albumInfo.getFromLastFm.bind(albumInfo),
      albumInfo.getFromWikipedia.bind(albumInfo),
      artistInfo.getFromLastFm.bind(artistInfo),
      artistInfo.getFromWikipedia.bind(artistInfo),
    ];

    let errors = [];
    for (const fn of fns) {
      try {
        const response = await fn();
        if (response) {
          return response;
        }
      } catch (error) {
        if (error instanceof NetworkError) {
          throw error;
        } else {
          console.log(error);
          errors.push(error);
        }
      }
    }

    if (errors.length > 0) {
      throw errors;
    } else {
      return null;
    }
  }

  function stripParenthesis(str) {
    const parenthesisIndex = str.indexOf("(");
    if (parenthesisIndex === -1) {
      return str;
    } else {
      return str.slice(0, parenthesisIndex).trim();
    }
  }

  function extractSummary(text) {
    const textHelper = new TextHelper(text);
    return textHelper.extractSummary({
      maxChars: 600,
      maxSentences: 5,
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
