export { default as Contact } from './Contact.astro';

// Export types
export interface ContactProps {
    address?: string;
    class?: string;
    compact?: boolean;
    description?: string;
    email?: string;
    facebook?: string;
    github?: string;
    linkedin?: string;
    phone?: string;
    title?: string;
    twitter?: string;
    website?: string;
}
