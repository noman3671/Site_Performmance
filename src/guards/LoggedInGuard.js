import { useLoggedIn } from "context/LoggedInContext";
import { Navigate } from "react-router-dom";

export const LoggedInGuard = ({ children }) => {
  const { user } = useLoggedIn();

  if (user) {
    return <Navigate to={"/user/horses"} replace />;
  } else {
    return <>{children}</>;
  }
};

export const ProtectedGuard = ({ children }) => {
  const { user } = useLoggedIn();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
