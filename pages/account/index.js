import { Button, Card, Container } from "react-bootstrap";
import Layout from "../../components/Layout/Layout";
import { useSession, signOut } from "next-auth/react";
import Center from "../../components/Layout/Center";

function AccountPage() {
  const session = useSession();

  function deleteAccount() {
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
    <Layout>
      <Center>
        <Button onClick={deleteAccount}>Delete Spinder Account</Button>
      </Center>
    </Layout>
  );
}

AccountPage.requiresAuthentication = true;

export default AccountPage;
