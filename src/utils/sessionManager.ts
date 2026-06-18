// Local storage keys
export const STORAGE_KEYS = {
  SESSION: "ocean_user_session",
  ONBOARDING_COMPLETED: "ocean_onboarding_completed",
  USERS: "ocean_users",
};

// Session management utility
export const sessionManager = {
  // Save user session
  saveSession: (user: any) => {
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(user));
  },

  // Get user session
  getSession: () => {
    const session = localStorage.getItem(STORAGE_KEYS.SESSION);
    return session ? JSON.parse(session) : null;
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return !!localStorage.getItem(STORAGE_KEYS.SESSION);
  },

  // Clear session (logout)
  clearSession: () => {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  },

  // Check onboarding status
  hasCompletedOnboarding: () => {
    return localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED) === "true";
  },

  // Mark onboarding as completed
  completeOnboarding: () => {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, "true");
  },
};

// User registration/login storage
export const userManager = {
  // Get all users from localStorage
  getAllUsers: () => {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : [];
  },

  // Save new user
  saveUser: (user: any) => {
    const users = userManager.getAllUsers();
    users.push(user);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  // Find user by email
  findUserByEmail: (email: string) => {
    const users = userManager.getAllUsers();
    return users.find((u: any) => u.email === email);
  },

  // Verify user credentials
  verifyCredentials: (email: string, password: string) => {
    const user = userManager.findUserByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  },

  // Check if email exists
  emailExists: (email: string) => {
    return !!userManager.findUserByEmail(email);
  },
};
