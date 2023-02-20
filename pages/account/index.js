import { Button } from "react-bootstrap";
import BasicPage from "../../components/UI/BasicPage";
import { MdDelete } from "react-icons/md";
import useSessionContext from "../../hooks/useSessionContext";
import { useRouter } from "next/router";
import useAlertContext from "../../hooks/useAlertContext";
import Alert from "../../components/UI/Alert";

function AccountPage() {
  const router = useRouter();
  const { user } = useSessionContext();
  const { alert, alertVisible, showAlert, hideAlert } = useAlertContext();

  function deleteAccount() {
    if (user.email === "testaccount@email.com") {
      showAlert(
        "You cannot delete this test account. Try creating a new one to test this feature",
        5000
      );

      return;
    }
    // @ts-ignore
    const userId = user.sub;

    fetch(`/api/users/${userId}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 200) {
        localStorage.clear();
        router.push("/logout");
      }
    });
  }

  return (
    <>
      <BasicPage
        title="Delete Account"
        icon={<MdDelete className="align-middle" />}
        maxWidth="400px"
      >
        <p>
          Click the button bellow to delete your account and all the Spinder
          data linked to it.
        </p>
        <p>
          <strong>{`Your Spotify account data won't be touched.`}</strong>
        </p>
        <div className="text-end">
          <Button onClick={deleteAccount}>Delete Spinder Account</Button>
        </div>
        <Alert show={alertVisible} alert={alert} onClose={hideAlert} />
      </BasicPage>
    </>
  );
}

AccountPage.requiresAuthentication = true;

export default AccountPage;
