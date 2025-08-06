/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module 'vitest' {
  interface Assertion<T = unknown> extends TestingLibraryMatchers<T, void> {
    // Extend Vitest assertions with Testing Library matchers
    toBeInTheDocument(): void;
  }
  interface AsymmetricMatchersContaining extends TestingLibraryMatchers<unknown, void> {
    // Extend asymmetric matchers with Testing Library matchers  
    toBeInTheDocument(): void;
  }
}