import AlbumItem from "./AlbumItem";

function AlbumsList({ albums, ...props }) {
  return (
    <>
      {albums.map((album) => {
        return <AlbumItem key={album.spotifyId} album={album} {...props} />;
      })}
    </>
  );
}

export default AlbumsList;
