export interface ValidationErrors {
  [key: string]: string;
}

export function validateContact(data: {
  name: string;
  phone: string;
  email: string;
  addressLine1: string;
  pincode: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required";
  }

  if (!data.phone.trim()) {
    errors.phone = "Contact number is required";
  } else if (!/^\d+$/.test(data.phone.trim())) {
    errors.phone = "Contact number must contain only digits";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(data.email.trim())) {
    errors.email = "Please enter a valid email";
  }

  if (!data.addressLine1.trim()) {
    errors.addressLine1 = "Address Line 1 is required";
  }

  if (!data.pincode.trim()) {
    errors.pincode = "Pincode is required";
  }

  return errors;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
