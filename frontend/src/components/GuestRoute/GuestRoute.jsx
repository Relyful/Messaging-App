import { Navigate, Outlet, useOutletContext } from "react-router";

export default function GuestRoute() {
  const context = useOutletContext();
  const user = context?.user;
  const isLoading = context?.isLoading;

  if (isLoading) {
    return null;
  }

  if (user) {
    return <Navigate to="/chat" replace />;
  }

  return <Outlet context={context} />;
}