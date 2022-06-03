import Layout from "../components/Layout/Layout";
import LoadingPage from "../components/UI/Loading";
import Center from "../components/Layout/Center";
import CoverCarousel from "../components/Cover/CoverCarousel";
import InfoSlider from "../components/UI/InfoSlider";
import Alert from "../components/UI/Alert";

import useAlbums from "../hooks/useAlbums";
import useInfo from "../hooks/useInfo";
import useAlertContext from "../hooks/useAlertContext";

function MainPage() {
  const { albums, albumIndex, nextAlbum, saveAlbum } = useAlbums();
  const { info, infoVisible, infoIsLoading, showInfo, hideInfo } = useInfo();
  const { alert, alertVisible, hideAlert } = useAlertContext();

  if (!albums) {
    return <LoadingPage></LoadingPage>;
  }

  const album = albums[albumIndex];

  return (
    <Layout genreMenu>
      <Center>
        <CoverCarousel
          album={album}
          onNextAlbum={nextAlbum}
          onSaveAlbum={saveAlbum}
          onInfo={showInfo}
        />
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

MainPage.requiresAuthentication = true;

export default MainPage;
