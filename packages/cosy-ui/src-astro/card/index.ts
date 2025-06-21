export { default as Card } from './Card.astro';
export { default as CardCourse } from './CardCourse.astro';

// Export types
export interface CardProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  href?: string;
  compact?: boolean;
  class?: string;
}

export interface CardCourseProps {
  title: string;
  link: string;
}
