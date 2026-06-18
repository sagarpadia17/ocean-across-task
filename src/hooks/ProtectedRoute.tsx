import { Navigate } from "react-router";
import { useCurrentUser } from "./useAppInitialization";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute component
 * Redirects to sign-in if user is not authenticated
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useCurrentUser();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

/**
 * PublicRoute component
 * Redirects to home if user is already authenticated
 */
interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated } = useCurrentUser();

  if (isAuthenticated) {
    return <Navigate to="/store/shop" replace />;
  }

  return <>{children}</>;
};
