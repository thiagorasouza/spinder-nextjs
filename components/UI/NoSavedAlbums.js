import { VscLibrary } from "react-icons/vsc";
import BasicPage from "./BasicPage";

function NoSavedAlbums() {
  return (
    <BasicPage
      title="Nothing here yet"
      icon={<VscLibrary className="align-middle" />}
      maxWidth="400px"
    >
      <p>You have not yet saved any album to your library.</p>
    </BasicPage>
  );
}

export default NoSavedAlbums;
