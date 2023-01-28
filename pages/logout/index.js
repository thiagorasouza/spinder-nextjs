import { useRouter } from "next/router";
import { MdLogout } from "react-icons/md";
import BasicPage from "../../components/UI/BasicPage";
import useMountEffect from "../../hooks/useMountEffect";
import useSessionContext from "../../hooks/useSessionContext";

function LogoutPage() {
  const { logout } = useSessionContext();
  const router = useRouter();

  useMountEffect(() => {
    logout();
    router.push("/login");
  });

  return (
    <BasicPage
      title="Logout"
      icon={<MdLogout className="align-middle" />}
      maxWidth="400px"
    >
      <p>Please wait, logging out...</p>
    </BasicPage>
  );
}

export default LogoutPage;
