import useAlert from "../../hooks/useAlert";
import useInfo from "../../hooks/useInfo";
import useAudio from "../../hooks/useAudio";
import useUserAlbums from "../../hooks/useUserAlbums";

import Center from "../../components/Layout/Center";
import Layout from "../../components/Layout/Layout";
import InfoSlider from "../../components/Sliders/InfoSlider";
import AlbumsList from "../../components/Album/AlbumsList";
import Alert from "../../components/UI/Alert";
import SavedAlbumsPlaceholderPage from "../../components/Placeholders/SavedAlbumsPlaceholderPage";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

function SavedAlbumsPage() {
  const { alert, alertVisible, showAlert, hideAlert } = useAlert();
  const { info, infoVisible, infoIsLoading, showInfo, hideInfo } =
    useInfo(showAlert);
  const { audio, playAudio, pauseAudio } = useAudio();
  const { albums, deleteAlbum } = useUserAlbums(pauseAudio);

  if (!albums) {
    return <SavedAlbumsPlaceholderPage />;
  }

  const hasSavedAlbums = Array.isArray(albums) && albums.length > 0;

  return (
    <Layout>
      <Alert show={alertVisible} alert={alert} onClose={hideAlert} />
      <Center>
        {hasSavedAlbums ? (
          <AlbumsList
            albums={albums}
            audio={audio}
            onDelete={deleteAlbum}
            onInfo={showInfo}
            onPlay={playAudio}
            onPause={pauseAudio}
          />
        ) : (
          <p>Nothing here yet.</p>
        )}
        <InfoSlider
          info={info}
          show={infoVisible}
          isLoading={infoIsLoading}
          onHide={hideInfo}
        />
      </Center>
    </Layout>
  );
}

SavedAlbumsPage.requiresAuthentication = true;
SavedAlbumsPage.placeholder = <SavedAlbumsPlaceholderPage />;

export default SavedAlbumsPage;
