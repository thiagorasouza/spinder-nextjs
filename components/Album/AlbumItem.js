import AlbumCard from "./AlbumCard";
import DeleteButton from "./DeleteButton";
import InfoButton from "./InfoButton";
import PlayButton from "./PlayButton.js";

function AlbumItem({ album, ...props }) {
  const albumYear = new Date(album.releaseDate).getFullYear();
  const cardSubtitle = album.artistName + " · " + albumYear;

  function handleDelete() {
    props.onDelete(album._id);
  }

  function handleInfo() {
    props.onInfo(album.artistName, album.albumName);
  }

  function handlePlay() {
    props.onPlay(album.previewURL);
  }

  function handlePause() {
    props.onPause();
  }

  const playable = album.previewURL !== null;

  const controls = (
    <>
      <DeleteButton onClick={handleDelete} />
      <InfoButton onClick={handleInfo} />
      <PlayButton
        playable={playable}
        playing={props.playing}
        onPlay={handlePlay}
        onPause={handlePause}
      />
    </>
  );

  return (
    <AlbumCard
      image={album.coverURL}
      title={album.albumName}
      link={album.albumURL}
      subtitle={cardSubtitle}
      controls={controls}
    />
  );
}

export default AlbumItem;
