import { getSession } from "next-auth/react";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import client from "../lib/mongodb";

import User from "../models/users.model.js";

async function getUserObject(req, res) {
  const { userId } = req.query;

  const session = await getSession({ req });

  if (userId !== session.user.id) {
    return res.status(401).json({
      message:
        "User does not have permission to permission to perform this action",
    });
  }

  const user = await User.findById(userId).exec();

  if (!user) {
    return res.status(404).json({
      message: "Could not find the requested user",
    });
  }

  return user;
}

async function getUserAndAlbumObject(req, res) {
  const { albumId } = req.query;

  const user = await getUserObject(req, res);
  if (!user) return;

  const album = await user.findAlbumById(albumId);

  if (!album) {
    return res.status(404).json({
      message: "Could not find the requested album in the specified user",
    });
  }

  return { user, album };
}

export async function getUser(req, res) {
  const user = await getUserObject(req, res);
  if (!user) return;

  return res.status(200).json(user);
}

export async function deleteUser(req, res) {
  const user = await getUserObject(req, res);
  if (!user) return;

  await MongoDBAdapter(client).deleteUser(user.id);

  return res.status(200).json(user);
}

export async function saveAlbumToUser(req, res) {
  const album = req.body;

  const user = await getUserObject(req, res);
  if (!user) return;

  const isAlbumSaved = await user.findAlbumBySpotifyId(album.spotifyId);

  if (isAlbumSaved) {
    return res.status(400).json({
      message: "This album is already saved to this user",
    });
  }

  const updatedUser = await user.saveAlbum(album);

  return res.status(200).json(updatedUser);
}

export async function saveSkippedAlbumToUser(req, res) {
  const { spotifyId } = req.body;

  const user = await getUserObject(req, res);
  if (!user) return;

  const updatedUser = await user.saveSkippedAlbum(spotifyId);

  return res.status(200).json(updatedUser.skippedAlbums);
}

export async function getAlbumsFromUser(req, res) {
  const user = await getUserObject(req, res);
  if (!user) return;

  const albums = await user.findAlbums();

  return res.status(200).json(albums);
}

export async function getSkippedAlbumsFromUser(req, res) {
  const user = await getUserObject(req, res);
  if (!user) return;

  const albums = await user.findSkippedAlbums();

  return res.status(200).json(albums);
}

export async function getAlbumFromUser(req, res) {
  const { album } = await getUserAndAlbumObject(req, res);
  if (!album) return;

  res.status(200).json(album);
}

export async function deleteAlbumFromUser(req, res) {
  const { user, album } = (await getUserAndAlbumObject(req, res)) || {};
  if (!user || !album) return;

  await user.deleteAlbum(album);

  return res.status(200).json(user.savedAlbums);
}

export async function clearSkippedAlbums(req, res) {
  const user = await getUserObject(req, res);
  if (!user) return;

  await user.clearSkippedAlbums();

  return res.status(200);
}
