import useSessionContext from "../hooks/useSessionContext";

function ProtectedPage() {
  const session = useSessionContext();
  console.log("🚀 ~ session", session);

  return <p>Protected page</p>;
}

export default ProtectedPage;
