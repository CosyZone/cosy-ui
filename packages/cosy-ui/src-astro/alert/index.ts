export { default as Alert } from './Alert.astro';

// Export types
export interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  class?: string;
}
