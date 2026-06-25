import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { fetchMe, getOrganization, getToken, saveAuth } from "../utils/auth";

export default function ProtectedRoute({ children }) {
  const { slug } = useParams();
  const [status, setStatus] = useState("loading");
  const [organization, setOrganization] = useState(getOrganization());

  useEffect(() => {
    async function verify() {
      if (!getToken()) {
        setStatus("unauthenticated");
        return;
      }

      const me = await fetchMe();

      if (!me) {
        setStatus("unauthenticated");
        return;
      }

      setOrganization(me);
      saveAuth(getToken(), me);

      if (me.slug !== slug) {
        setStatus("wrong-slug");
        return;
      }

      setStatus("authenticated");
    }

    verify();
  }, [slug]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  if (status === "wrong-slug") {
    return <Navigate to={`/org/${organization.slug}/dashboard`} replace />;
  }

  return children(organization);
}
