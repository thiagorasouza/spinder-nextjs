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
  albums: [albumsSchema],
  image: String,
  emailVerified: Date,
});

usersSchema.methods.findAlbums = async function () {
  return this.albums;
};

usersSchema.methods.findAlbumById = async function (albumId) {
  return this.albums.id(albumId);
};

usersSchema.methods.findAlbumBySpotifyId = async function (spotifyId) {
  return this.albums.find((album) => album.spotifyId === spotifyId);
};

usersSchema.methods.saveAlbum = async function (album) {
  this.albums.push(album);
  return await this.save();
};

usersSchema.methods.deleteAlbum = async function (album) {
  album.remove();
  return await this.save();
};

const User = mongoose.models.User || mongoose.model("User", usersSchema);

export default User;
