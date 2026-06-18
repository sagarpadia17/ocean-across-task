// Authentication and Session Management
export {
  sessionManager,
  userManager,
  STORAGE_KEYS,
} from "../utils/sessionManager";

// OTP Management
export { generateOTP, storeOTP, verifyOTP, clearOTP, getStoredOTP } from "../utils/otpManager";

// Validation
export {
  validateEmail,
  validatePhoneNumber,
  validatePassword,
  validatePasswordMatch,
  validateName,
  validateSignUp,
  validateLogin,
  validatePhoneForm,
  validateOTP,
} from "../utils/validation";

// Navigation
export { getInitialRoute, routes, isProtectedRoute, requiresAuth } from "../utils/navigation";

// Hooks
export {
  AppWrapper,
  useAuthRedirect,
  useCurrentUser,
  useAuth,
} from "./useAppInitialization";

// Route Guards
export { ProtectedRoute, PublicRoute } from "./ProtectedRoute";
