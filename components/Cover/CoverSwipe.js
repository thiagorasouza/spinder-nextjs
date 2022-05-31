import CoverItem from "./CoverItem";

function CoverSwipe(props) {
  const album = props.albums[props.currentAlbumIndex];

  return (
    <CoverItem
      album={album}
      nextAlbum={props.nextAlbum}
      saveAlbum={props.saveAlbum}
    />
  );
}

export default CoverSwipe;
