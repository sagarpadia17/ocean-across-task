// Validation utilities for authentication forms

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/; // 10-digit phone number
  return phoneRegex.test(phone);
};

export const validatePassword = (password: string): boolean => {
  // At least 6 characters
  return password.length >= 6;
};

export const validatePasswordMatch = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

// Validation for signup form
export const validateSignUp = (formData: {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!validateName(formData.fullName)) {
    errors.fullName = "Full name must be at least 2 characters";
  }

  if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!validatePassword(formData.password)) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!validatePasswordMatch(formData.password, formData.confirmPassword)) {
    errors.confirmPassword = "Passwords do not match";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

// Validation for login form
export const validateLogin = (formData: {
  email: string;
  password: string;
}): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!validatePassword(formData.password)) {
    errors.password = "Password must be at least 6 characters";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

// Validation for phone number form
export const validatePhoneForm = (phone: string): { valid: boolean; error: string } => {
  if (!validatePhoneNumber(phone)) {
    return {
      valid: false,
      error: "Please enter a valid 10-digit phone number",
    };
  }
  return {
    valid: true,
    error: "",
  };
};

// Validation for OTP
export const validateOTP = (otp: string): { valid: boolean; error: string } => {
  if (!otp || otp.length !== 6 || !/^\d{6}$/.test(otp)) {
    return {
      valid: false,
      error: "Please enter a valid 6-digit OTP",
    };
  }
  return {
    valid: true,
    error: "",
  };
};
