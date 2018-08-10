/**
 * VALIDATION RULES
 */

export const PASSWORD_LENGTH = 8;
export const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const required = (value) => !!value || 'Required.';

export const password = (value) => value.length >= PASSWORD_LENGTH || `Min ${PASSWORD_LENGTH} characters`;

export const email = (value) => {
  const pattern = EMAIL_PATTERN;
  return pattern.test(value) || 'Invalid email.';
};
