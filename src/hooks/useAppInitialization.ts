import { useEffect, useState } from "react";
import { useUserStore } from "../stores/userStore";
import { getInitialRoute } from "../utils/navigation";

interface AppWrapperProps {
  onReady: (initialRoute: string) => void;
}

/**
 * AppWrapper handles:
 * 1. Session restoration on app startup
 * 2. Onboarding and authentication status checking
 * 3. Determining the initial route to navigate to
 */
export const AppWrapper = ({ onReady }: AppWrapperProps) => {
  const [isReady, setIsReady] = useState(false);
  const restoreSession = useUserStore((state) => state.restoreSession);

  useEffect(() => {
    // Simulate app initialization
    const initializeApp = () => {
      // Restore user session if it exists
      restoreSession();

      // Determine which route to navigate to
      const initialRoute = getInitialRoute();

      // Notify parent component that app is ready
      onReady(initialRoute);

      setIsReady(true);
    };

    // Add a small delay to ensure all effects are processed
    const timer = setTimeout(initializeApp, 100);

    return () => clearTimeout(timer);
  }, [restoreSession, onReady]);

  // Return null while initializing
  if (!isReady) {
    return null;
  }

  return null;
};

/**
 * Hook to check if user should be redirected to login
 */
export const useAuthRedirect = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  return {
    isAuthenticated,
    shouldRedirectToLogin: !isAuthenticated,
  };
};

/**
 * Hook to get current user from store
 */
export const useCurrentUser = () => {
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  return {
    user,
    isAuthenticated,
    isLoggedIn: !!user,
  };
};

/**
 * Hook for authentication actions
 */
export const useAuth = () => {
  const { setUser, logout, updateUser } = useUserStore();

  const login = (user: any) => {
    setUser(user);
  };

  const logoutUser = () => {
    logout();
  };

  const updateProfile = (updates: any) => {
    updateUser(updates);
  };

  return {
    login,
    logout: logoutUser,
    updateProfile,
  };
};
