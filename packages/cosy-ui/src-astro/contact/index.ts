export { default as Contact } from './Contact.astro';

// Export types
export interface ContactProps {
  title?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  github?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  compact?: boolean;
  class?: string;
}
