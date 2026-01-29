/**
 * Form validation utilities
 */

/**
 * Validate a US phone number
 * Accepts formats: (555) 123-4567, 555-123-4567, 5551234567, +1-555-123-4567
 */
export function validatePhone(phone: string): { valid: boolean; formatted: string; error?: string } {
  if (!phone || phone.trim() === '') {
    return { valid: true, formatted: '' }; // Empty is valid (phone is optional)
  }

  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');

  // Remove leading +1 if present
  const digits = cleaned.replace(/^\+?1/, '');

  // Check if we have exactly 10 digits
  if (digits.length !== 10) {
    return {
      valid: false,
      formatted: phone,
      error: 'Please enter a valid 10-digit phone number',
    };
  }

  // Check for obviously invalid numbers (all same digit, sequential, etc.)
  if (/^(\d)\1{9}$/.test(digits)) {
    return {
      valid: false,
      formatted: phone,
      error: 'Please enter a valid phone number',
    };
  }

  // Format as (XXX) XXX-XXXX
  const formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;

  return { valid: true, formatted };
}

/**
 * Format phone number as user types
 */
export function formatPhoneInput(value: string): string {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '');

  // Limit to 10 digits
  const limited = digits.slice(0, 10);

  // Format based on length
  if (limited.length === 0) return '';
  if (limited.length <= 3) return `(${limited}`;
  if (limited.length <= 6) return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
  return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`;
}

/**
 * Allowed file types for resume/document uploads
 */
export const ALLOWED_FILE_TYPES = {
  resume: {
    extensions: ['.pdf', '.doc', '.docx'],
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    label: 'PDF or Word document',
  },
  image: {
    extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    label: 'image (JPG, PNG, GIF, or WebP)',
  },
};

/**
 * Maximum file sizes in bytes
 */
export const MAX_FILE_SIZES = {
  resume: 5 * 1024 * 1024, // 5MB
  image: 10 * 1024 * 1024, // 10MB
};

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Validate a file upload
 */
export function validateFile(
  file: File,
  type: keyof typeof ALLOWED_FILE_TYPES
): { valid: boolean; error?: string } {
  const config = ALLOWED_FILE_TYPES[type];
  const maxSize = MAX_FILE_SIZES[type];

  // Check file extension
  const fileName = file.name.toLowerCase();
  const hasValidExtension = config.extensions.some((ext) => fileName.endsWith(ext));

  if (!hasValidExtension) {
    return {
      valid: false,
      error: `Please upload a valid ${config.label} (${config.extensions.join(', ')})`,
    };
  }

  // Check MIME type (more reliable than extension)
  if (!config.mimeTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Please upload a ${config.label}`,
    };
  }

  // Check file size
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File is too large. Maximum size is ${formatFileSize(maxSize)}`,
    };
  }

  // Check for empty files
  if (file.size === 0) {
    return {
      valid: false,
      error: 'The selected file appears to be empty',
    };
  }

  return { valid: true };
}

/**
 * Validate email format
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email || email.trim() === '') {
    return { valid: false, error: 'Email is required' };
  }

  // Basic email regex - covers most valid cases
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }

  return { valid: true };
}

/**
 * Validate required text field
 */
export function validateRequired(value: string, fieldName: string): { valid: boolean; error?: string } {
  if (!value || value.trim() === '') {
    return { valid: false, error: `${fieldName} is required` };
  }
  return { valid: true };
}
