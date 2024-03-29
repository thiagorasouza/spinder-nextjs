import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import User from "../models/users.model.js";

export async function createUser(req, res) {
  const userData = req.body;

  const requiredFields = ["name", "email", "password", "passwordConfirmation"];
  for (const field of requiredFields) {
    if (!userData[field] || userData[field] === "") {
      return res.status(400).json({
        message: `Missing ${field} field`,
      });
    }
  }

  const { name, email, password, passwordConfirmation } = userData;

  const emailAlreadyRegistered = await User.findOne({ email }).exec();
  if (emailAlreadyRegistered) {
    return res.status(400).json({
      message: `Email already registered`,
    });
  }

  if (password !== passwordConfirmation) {
    return res.status(400).json({
      message: "Passwords do not match",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const savedUser = await User.create({
    name,
    email,
    password: hashedPassword,
    savedAlbums: [],
    skippedAlbums: [],
  });

  return res.status(200).json(savedUser);
}

export async function loginUser(req, res) {
  const userData = req.body;

  const requiredFields = ["email", "password"];
  for (const field of requiredFields) {
    if (!userData[field] || userData[field] === "") {
      return res.status(400).json({
        message: `Missing ${field} field`,
      });
    }
  }

  const { email, password: rawPassword } = userData;

  const userFound = await User.findOne({ email }).exec();
  if (!userFound) {
    return res.status(400).json({
      message: `Email or password incorrect`,
    });
  }

  const passwordsMatch = await bcrypt.compare(rawPassword, userFound.password);
  if (!passwordsMatch) {
    return res.status(400).json({
      message: `Email or password incorrect`,
    });
  }

  const token = jwt.sign(
    {
      sub: userFound._id,
      name: userFound.name,
      email: userFound.email,
    },
    process.env.JWT_SECRET
  );

  return res.status(200).json({ userToken: token });
}

export async function checkUserToken(req, res) {
  if (!req.body.userToken) {
    return res.status(400).json({
      message: "Invalid user token",
    });
  }

  const { userToken } = req.body;

  try {
    const payload = await jwt.verify(userToken, process.env.JWT_SECRET);
    return res.status(200).json(payload);
  } catch (error) {
    return res.status(400).json({
      message: "Invalid user token",
    });
  }
}

async function getUserObject(req, res) {
  const { userId } = req.query;

  const userToken = req.cookies.userToken;
  if (!userToken) {
    return res.status(401).json({
      message:
        "User does not have permission to permission to perform this action",
    });
  }

  const payload = await jwt.verify(userToken, process.env.JWT_SECRET);

  if (userId !== payload.sub) {
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

  if (user.email === "testaccount@email.com") {
    return res.status(403).json({ message: "Unable to delete test account." });
  }

  await User.deleteOne({ _id: user._id });

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
