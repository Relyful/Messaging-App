import { Navigate, Outlet, useOutletContext } from "react-router";

export default function ProtectedRoute() {
  const context = useOutletContext();
  const user = context?.user;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet context={context} />;
}