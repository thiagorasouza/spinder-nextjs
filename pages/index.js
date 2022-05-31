import Layout from "../components/Layout/Layout";
import CoverSwipe from "../components/Cover/CoverSwipe";
import LoadingPage from "../components/UI/Loading";
import Center from "../components/Layout/Center";

import useAlbums from "../hooks/useAlbums";

function MainPage() {
  const { albums, albumIndex, nextAlbum, saveAlbum } = useAlbums();

  if (!albums) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <Layout genreMenu>
      <Center>
        <CoverSwipe
          albums={albums}
          currentAlbumIndex={albumIndex}
          nextAlbum={nextAlbum}
          saveAlbum={saveAlbum}
        />
      </Center>
    </Layout>
  );
}

MainPage.requiresAuthentication = true;

export default MainPage;
