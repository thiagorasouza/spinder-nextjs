import mongoose from "mongoose";

const albumsSchema = new mongoose.Schema({
  spotifyId: String,
  albumName: String,
  albumURL: String,
  coverURL: String,
  artistName: String,
  artistURL: String,
  releaseDate: Date,
  previewURL: String,
});

const usersSchema = new mongoose.Schema({
  _id: mongoose.ObjectId,
  spotifyId: String,
  name: String,
  email: String,
  image: String,
  emailVerified: Date,
  savedAlbums: [albumsSchema],
  skippedAlbums: [String],
});

usersSchema.methods.findAlbums = async function () {
  return this.savedAlbums;
};

usersSchema.methods.findSkippedAlbums = async function () {
  return this.skippedAlbums;
};

usersSchema.methods.findAlbumById = async function (albumId) {
  return this.savedAlbums.id(albumId);
};

usersSchema.methods.findAlbumBySpotifyId = async function (spotifyId) {
  return this.savedAlbums.find((album) => album.spotifyId === spotifyId);
};

usersSchema.methods.saveAlbum = async function (album) {
  this.savedAlbums.push(album);
  return await this.save();
};

usersSchema.methods.saveSkippedAlbum = async function (spotifyId) {
  this.skippedAlbums.push(spotifyId);
  return await this.save();
};

usersSchema.methods.deleteAlbum = async function (album) {
  album.remove();
  return await this.save();
};

usersSchema.methods.clearSkippedAlbums = async function () {
  this.skippedAlbums = [];
  return await this.save();
};

const User = mongoose.models.User || mongoose.model("User", usersSchema);

export default User;
