import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router";
import "./App.css";

// Components
import SplashScreen from "@/components/SplashScreen";
import Layout from "@/components/Layout";

// Pages
import Onboarding from "@/pages/Onboarding";
import SignIn from "@/pages/Authentication/SignIn";
import Number from "@/pages/Authentication/Number";
import Verification from "@/pages/Authentication/Verification";
import Location from "@/pages/Authentication/Location";
import Login from "@/pages/Authentication/Login";
import SignUp from "@/pages/Authentication/SignUp";
import Shop from "@/pages/Store/Shop";
import Explore from "@/pages/Store/Explore";
import Cart from "@/pages/Store/Cart";
import Favorite from "@/pages/Store/Favorite";
import ProductDetails from "@/pages/Store/ProductDetails";
import CategoryProducts from "@/pages/Store/CategoryProducts";
import Account from "@/pages/Account";

// Hooks and utilities
import { ProtectedRoute, PublicRoute } from "@/hooks/ProtectedRoute";
import { getInitialRoute } from "@/utils/navigation";
import { useUserStore } from "@/stores/userStore";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<string>("/onboarding");
  const restoreSession = useUserStore((state) => state.restoreSession);

  useEffect(() => {
    // Initialize app on mount
    const initializeApp = async () => {
      // Restore user session if it exists
      restoreSession();

      // Determine which route to navigate to based on app state
      const route = getInitialRoute();
      setInitialRoute(route);

      // Complete loading after splash screen displays (2.5s)
      const loadingTimer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      return () => clearTimeout(loadingTimer);
    };

    initializeApp();
  }, [restoreSession]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Routes>
      {/* Root redirect to initial route */}
      <Route path="/" element={<Navigate to={initialRoute} replace />} />

      {/* Public Authentication Routes - redirects to shop if already logged in */}
      <Route
        path="/onboarding"
        element={
          <PublicRoute>
            <Onboarding />
          </PublicRoute>
        }
      />
      <Route
        path="/signin"
        element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        }
      />
      <Route
        path="/authentication/number"
        element={<Number />}
      />
      <Route
        path="/authentication/verification"
        element={<Verification />}
      />
      <Route
        path="/authentication/location"
        element={<Location />}
      />
      <Route
        path="/authentication/login"
        element={<Login />}
      />
      <Route
        path="/authentication/signup"
        element={<SignUp />}
      />

      {/* Protected Store Routes - redirects to signin if not logged in */}
      <Route
        path="/store/shop"
        element={
          <ProtectedRoute>
            <Layout>
              <Shop />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/store/explore"
        element={
          <ProtectedRoute>
            <Layout>
              <Explore />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/store/cart"
        element={
          <ProtectedRoute>
            <Layout>
              <Cart />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/store/favorites"
        element={
          <ProtectedRoute>
            <Layout>
              <Favorite />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/store/product-details"
        element={
          <ProtectedRoute>
            <Layout>
              <ProductDetails />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/store/category-products"
        element={
          <ProtectedRoute>
            <Layout>
              <CategoryProducts />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Layout>
              <Account />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to={initialRoute} replace />} />
    </Routes>
  );
}

export default App;
