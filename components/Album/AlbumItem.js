import useAudioContext from "../../hooks/useAudioContext";
import AlbumCard from "./AlbumCard";
import DeleteButton from "./DeleteButton";
import InfoButton from "./InfoButton";
import PlayButton from "./PlayButton.js";

function AlbumItem({ album, ...props }) {
  const { audio, playAudio, pauseAudio } = useAudioContext();

  const albumYear = new Date(album.releaseDate).getFullYear();
  const cardSubtitle = album.artistName + " · " + albumYear;

  function handleDelete() {
    props.onDelete(album._id);
  }

  function handleInfo() {
    props.onInfo(album.artistName, album.albumName);
  }

  const playable = album.previewURL !== null;
  const playing = audio && audio.src === album.previewURL;

  const controls = (
    <>
      <DeleteButton onClick={handleDelete} />
      <InfoButton onClick={handleInfo} />
      <PlayButton
        playable={playable}
        playing={playing}
        onPlay={() => playAudio(album.previewURL)}
        onPause={() => pauseAudio()}
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
