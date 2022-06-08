import { VscDebugDisconnect } from "react-icons/vsc";

import BasicPage from "./BasicPage";

function ConnectionLostPage() {
  return (
    <BasicPage
      title="Connection lost"
      icon={<VscDebugDisconnect />}
      maxWidth="400px"
    >
      <p>
        Seems like your internet connection was lost. You will be redirected
        back once your connection is reestablished.
      </p>
    </BasicPage>
  );
}

export default ConnectionLostPage;
