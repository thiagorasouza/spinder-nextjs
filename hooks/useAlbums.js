import SpotifyApi from "../lib/spotify-api";
import { getFromLocal, saveToLocal } from "../lib/web-storage";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { saveAlbumToUser } from "../lib/http";
import useUpdateEffect from "./useUpdateEffect";
import useMountEffect from "./useMountEffect";
import useGenreContext from "./useGenreContext";
import useCache from "./useCache";

function useAlbums() {
  const session = useSession();

  const { genre } = useGenreContext();
  const [albums, setAlbums] = useCache("albums", null);
  const [albumIndex, setAlbumIndex] = useCache("albumIndex", 0, isIndexValid);
  const [loading, setLoading] = useState(false);
  const [nextAlbums, setNextAlbums] = useState(null);

  useMountEffect(() => {
    if (isAlbumsEmpty()) {
      loadVisibleAlbums();
    }
  });

  useUpdateEffect(() => {
    setAlbums(null);
    loadVisibleAlbums();
  }, [genre]);

  useUpdateEffect(() => {
    if (isAlbumsEmpty()) return;

    const lastFour = albums.length - 4;
    if (albumIndex >= lastFour && !nextAlbums) {
      loadNextAlbums();
    }
  });

  function isIndexValid(cachedIndex) {
    return Array.isArray(albums) && cachedIndex < albums.length;
  }

  function isAlbumsEmpty() {
    return !albums || (Array.isArray(albums) && albums.length === 0);
  }

  async function loadVisibleAlbums() {
    const albums = await loadAlbums();
    setAlbums(albums);
    setAlbumIndex(0);
  }

  async function loadNextAlbums() {
    const albums = await loadAlbums();
    setNextAlbums(albums);
  }

  async function loadAlbums() {
    if (loading) return;
    setLoading(true);

    const api = getApiInstance();

    try {
      const albums = await api.getRecommendedAlbums(genre);
      setLoading(false);
      return albums;
    } catch (error) {
      setLoading(false);
      console.log(error);
      const isTokenExpired = error.status === 401;
      if (isTokenExpired) {
        signOut();
      }
    }
  }

  function getApiInstance() {
    const accessToken = session.data.accessToken;
    const market = session.data.user.country;
    return new SpotifyApi(accessToken, market);
  }

  async function saveAlbum(album) {
    const userId = session.data.user.id;
    const response = await saveAlbumToUser(album, userId);

    const savedNow = response.status === 200;
    const alreadySaved = response.status === 400;

    if (savedNow || alreadySaved) {
      nextAlbum();
    }
  }

  async function nextAlbum() {
    const maxIndex = albums.length - 1;
    if (albumIndex < maxIndex) {
      setAlbumIndex((albumIndex) => albumIndex + 1);
    } else {
      setAlbums(nextAlbums);
      setNextAlbums(null);
      setAlbumIndex(0);
    }
  }

  return { albums, albumIndex, nextAlbum, saveAlbum };
}

export default useAlbums;
