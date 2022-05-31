import AlbumItem from "./AlbumItem";

function AlbumsList({ albums, audio, ...props }) {
  return albums.map((album) => {
    const playing = audio && audio.src === album.previewURL;

    return (
      <AlbumItem
        key={album.spotifyId}
        album={album}
        playing={playing}
        {...props}
      />
    );
  });
}

export default AlbumsList;