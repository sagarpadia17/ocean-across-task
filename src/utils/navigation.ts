import { sessionManager } from "./sessionManager";

// Determine the initial route based on app state
export const getInitialRoute = (): string => {
  // Check if user is logged in
  if (sessionManager.isLoggedIn()) {
    return "/shop"; // Navigate to home/shop page
  }

  // Check if onboarding has been completed
  if (sessionManager.hasCompletedOnboarding()) {
    return "/signin"; // Navigate to sign in
  }

  // First time user - show onboarding
  return "/onboarding";
};

// Navigation routes
export const routes = {
  SPLASH: "/",
  ONBOARDING: "/onboarding",
  SIGNIN: "/signin",
  LOGIN: "/authentication/login",
  SIGNUP: "/authentication/signup",
  MOBILE: "/authentication/number",
  VERIFICATION: "/authentication/verification",
  LOCATION: "/authentication/location",
  SHOP: "/store/shop",
  EXPLORE: "/store/explore",
  CART: "/store/cart",
  FAVORITE: "/store/favorite",
  PRODUCT_DETAILS: "/store/product-details",
  CATEGORY_PRODUCTS: "/store/category-products",
};

// Route guard - check if user should access a route
export const isProtectedRoute = (path: string): boolean => {
  const protectedRoutes = [
    routes.SHOP,
    routes.EXPLORE,
    routes.CART,
    routes.FAVORITE,
    routes.PRODUCT_DETAILS,
    routes.CATEGORY_PRODUCTS,
  ];
  return protectedRoutes.includes(path);
};

// Check if route requires authentication
export const requiresAuth = (path: string): boolean => {
  return isProtectedRoute(path);
};
