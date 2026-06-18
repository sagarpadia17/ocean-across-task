// OTP utility functions for mock authentication

// Generate a random 6-digit OTP
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store OTP temporarily in sessionStorage (expires after 10 minutes)
export const storeOTP = (phone: string, otp: string) => {
  const otpData = {
    otp,
    phone,
    timestamp: Date.now(),
    expires: Date.now() + 10 * 60 * 1000, // 10 minutes expiry
  };
  sessionStorage.setItem(`otp_${phone}`, JSON.stringify(otpData));
};

// Verify OTP
export const verifyOTP = (phone: string, enteredOTP: string): boolean => {
  const otpData = sessionStorage.getItem(`otp_${phone}`);

  if (!otpData) {
    return false;
  }

  const parsedData = JSON.parse(otpData);

  // Check if OTP has expired
  if (Date.now() > parsedData.expires) {
    sessionStorage.removeItem(`otp_${phone}`);
    return false;
  }

  // Check if OTP matches
  return parsedData.otp === enteredOTP;
};

// Clear OTP
export const clearOTP = (phone: string) => {
  sessionStorage.removeItem(`otp_${phone}`);
};

// Get stored OTP (for debugging/testing purposes)
export const getStoredOTP = (phone: string): string | null => {
  const otpData = sessionStorage.getItem(`otp_${phone}`);
  return otpData ? JSON.parse(otpData).otp : null;
};
