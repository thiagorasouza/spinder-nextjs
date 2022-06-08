import { Button } from "react-bootstrap";
import { useSession, signOut } from "next-auth/react";
import BasicPage from "../../components/UI/BasicPage";
import { MdDelete } from "react-icons/md";

function AccountPage() {
  const session = useSession();

  function deleteAccount() {
    // @ts-ignore
    const userId = session.data.user.id;
    console.log(`Delete user ${userId} account`);

    fetch(`/api/users/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          localStorage.clear();
          signOut();
        }
      })
      .catch(console.log);
  }

  return (
    <BasicPage
      title="Delete Account"
      icon={<MdDelete className="align-middle" />}
      maxWidth="400px"
    >
      <p>
        Click the button bellow to delete your account and all the Spinder data
        linked to it.
      </p>
      <p>
        <strong>{`Your Spotify account data won't be touched.`}</strong>
      </p>
      <div className="text-end">
        <Button onClick={deleteAccount}>Delete Spinder Account</Button>
      </div>
    </BasicPage>
  );
}

AccountPage.requiresAuthentication = true;

export default AccountPage;
