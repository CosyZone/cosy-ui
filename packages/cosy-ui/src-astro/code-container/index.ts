export { default as CodeContainer } from './CodeContainer.astro';

// Export types
export interface CodeContainerProps {
  titles?: string[];
  descriptions?: string[];
  codes: string[];
  useIframe?: boolean;
  resetStyles?: boolean;
}
