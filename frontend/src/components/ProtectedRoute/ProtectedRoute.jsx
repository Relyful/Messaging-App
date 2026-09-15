import { Navigate, Outlet, useOutletContext } from "react-router";

export default function ProtectedRoute() {
  const context = useOutletContext();
  const user = context?.user;
  const isLoading = context?.isLoading;

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet context={context} />;
}