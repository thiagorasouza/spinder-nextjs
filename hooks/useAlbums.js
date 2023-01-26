import SpotifyApi from "../lib/spotify-api";

import { useState } from "react";
import {
  saveAlbumToUser,
  getUserAlbums,
  getSkippedUserAlbums,
  saveSkippedAlbumToUser,
} from "../lib/http";
import useUpdateEffect from "./useUpdateEffect";
import useMountEffect from "./useMountEffect";
import useGenreContext from "./useGenreContext";
import useAlertContext from "./useAlertContext";
import useAlbumsCache from "./useAlbumsCache";
import fetcher from "../lib/fetcher";
import useSessionContext from "./useSessionContext";

function useAlbums() {
  const [jwt] = useSessionContext();
  const { genre } = useGenreContext();
  const [albums, albumIndex, setAlbums] = useAlbumsCache();
  const [skippedAlbums, setSkippedAlbums] = useState([]);
  const [savedAlbums, setSavedAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlertContext();

  useMountEffect(async () => {
    const userId = getUserId();

    const skippedAlbums = await getSkippedUserAlbums(userId);
    setSkippedAlbums(skippedAlbums);

    const savedAlbums = await getUserAlbums(userId);
    const savedAlbumsIds = savedAlbums.map((album) => album.spotifyId);
    setSavedAlbums(savedAlbumsIds);

    if (isAlbumsEmpty()) {
      loadNewAlbumsInLoadingState();
    } else {
      continueWithCachedAlbums();
    }
  });

  useUpdateEffect(() => {
    resetAlbumsInLoadingState();
  }, [genre]);

  useUpdateEffect(() => {});

  function isAlbumsEmpty() {
    return albums.length === 0;
  }

  async function resetAlbumsInLoadingState() {
    setLoading(true);
    setAlbums([], 0);
    await loadNewAlbums();
    setLoading(false);
  }

  async function loadNewAlbumsInLoadingState() {
    setLoading(true);
    await loadNewAlbums();
    setLoading(false);
  }

  async function loadNewAlbums() {
    const newAlbums = await getNewAlbums();
    if (isNotEmpty(newAlbums)) {
      await syncNewAlbums(newAlbums);
    } else {
      showAlert(
        "It seems like you reached the end of the line for this genre."
      );
    }
  }

  function isNotEmpty(arr) {
    return arr && Array.isArray(arr) && arr.length > 0;
  }

  async function syncNewAlbums(newAlbums) {
    setAlbums(newAlbums, 0);
  }

  async function getNewAlbums() {
    const api = await getApiInstance();

    try {
      const loadedAlbums = await api.getRecommendedAlbums(genre);
      console.log("Loaded Albums:", loadedAlbums.length);
      const newAlbums = removeSeenAlbums(removeDuplicates(loadedAlbums));
      console.log("New Albums", newAlbums.length);
      return newAlbums;
    } catch (error) {
      console.log(error);
      const isTokenExpired = error.status === 401;
      if (isTokenExpired) {
        console.log("Token expired");
      }
    }
  }

  async function getApiInstance() {
    const response = await fetcher("/api/token");
    const { access_token } = await response.json();
    return new SpotifyApi(access_token);
  }

  function removeDuplicates(albums) {
    const uniqueAlbums = [];
    albums.forEach((album) => {
      const isUnique = !uniqueAlbums.some(
        (item) => item.spotifyId === album.spotifyId
      );
      if (isUnique) {
        uniqueAlbums.push(album);
      }
    });
    return uniqueAlbums;
  }

  function removeSeenAlbums(albums) {
    return albums.filter((album) => {
      return (
        !savedAlbums.includes(album.spotifyId) &&
        !skippedAlbums.includes(album.spotifyId)
      );
    });
  }

  function continueWithCachedAlbums() {
    setLoading(false);
  }

  function saveAlbumInLoadingState(album) {
    setLoading(true);
    saveAlbum(album);
    setLoading(false);
  }

  async function saveAlbum(album) {
    const userId = getUserId();
    const response = await saveAlbumToUser(album, userId);

    const savedSuccessfully = response.status === 200;
    const alreadySaved = response.status === 400;

    if (savedSuccessfully) {
      setSavedAlbums((previous) => [...previous, album.spotifyId]);
      skipAlbum();
    } else if (alreadySaved) {
      showAlert(
        `Album "${album.albumName}" was already saved to your library.`,
        5000
      );
      skipAlbum();
    } else {
      showAlert("Unable to save this album. Please try again later.");
    }
  }

  async function saveAndSkipAlbum() {
    await saveCurrentAlbumAsSkipped();
    skipAlbum();
  }

  async function skipAlbum() {
    if (nextAlbumExists()) {
      goToNextAlbum();
    } else {
      loadNewAlbums();
    }
  }

  async function saveCurrentAlbumAsSkipped() {
    const spotifyId = getCurrentAlbumSpotifyId();
    const userId = getUserId();

    const skippedAlbums = await saveSkippedAlbumToUser(spotifyId, userId);
    setSkippedAlbums(skippedAlbums);
    return skippedAlbums;
  }

  function getUserId() {
    return jwt.sub;
  }

  function getCurrentAlbumSpotifyId() {
    return albums[albumIndex].spotifyId;
  }

  function nextAlbumExists() {
    const lastAlbumIndex = albums.length - 1;
    const currentIndex = albumIndex;

    return currentIndex < lastAlbumIndex;
  }

  async function goToNextAlbum() {
    setAlbums(albums, albumIndex + 1);
  }

  return {
    albums,
    albumIndex,
    albumsAreLoading: loading,
    nextAlbum: saveAndSkipAlbum,
    saveAlbum: saveAlbumInLoadingState,
  };
}

export default useAlbums;
