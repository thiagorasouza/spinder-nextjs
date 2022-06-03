import useAlert from "../../hooks/useAlert";
import useInfo from "../../hooks/useInfo";
import useUserAlbums from "../../hooks/useUserAlbums";
import useAudioContext from "../../hooks/useAudioContext";

import Center from "../../components/Layout/Center";
import Layout from "../../components/Layout/Layout";
import InfoSlider from "../../components/UI/InfoSlider";
import AlbumsList from "../../components/Album/AlbumsList";
import Alert from "../../components/UI/Alert";
import SavedAlbumsPlaceholder from "../../components/Placeholders/SavedAlbumsPlaceholder";

function SavedAlbumsPage() {
  const { alert, alertVisible, showAlert, hideAlert } = useAlert();
  const { info, infoVisible, infoIsLoading, showInfo, hideInfo } =
    useInfo(showAlert);
  const { pauseAudio } = useAudioContext();
  const { albums, deleteAlbum } = useUserAlbums(pauseAudio);

  if (!albums) {
    return <SavedAlbumsPlaceholder />;
  }

  const hasSavedAlbums = Array.isArray(albums) && albums.length > 0;

  return (
    <Layout>
      <Center>
        {hasSavedAlbums ? (
          <AlbumsList
            albums={albums}
            onDelete={deleteAlbum}
            onInfo={showInfo}
          />
        ) : (
          <p>Nothing here yet.</p>
        )}
      </Center>
      <InfoSlider
        info={info}
        show={infoVisible}
        isLoading={infoIsLoading}
        onHide={hideInfo}
      />
      <Alert show={alertVisible} alert={alert} onClose={hideAlert} />
    </Layout>
  );
}

SavedAlbumsPage.requiresAuthentication = true;
SavedAlbumsPage.placeholder = <SavedAlbumsPlaceholder />;

export default SavedAlbumsPage;
