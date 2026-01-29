import * as React from 'react';
import { ErrorBoundary, PageErrorBoundary } from './error-boundary';

interface SafeHydrateProps {
  children: React.ReactNode;
}

/**
 * SafeHydrate wraps children in an error boundary to catch errors during React hydration
 * and rendering. This is especially useful for client-side React components in Astro.
 *
 * Usage in Astro pages:
 * ```astro
 * <SafeHydrate client:load>
 *   <MyComponent />
 * </SafeHydrate>
 * ```
 */
export function SafeHydrate({ children }: SafeHydrateProps) {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
}

/**
 * PageSafeHydrate provides a more prominent error UI for page-level content
 */
export function PageSafeHydrate({ children }: SafeHydrateProps) {
  return (
    <PageErrorBoundary>
      {children}
    </PageErrorBoundary>
  );
}

/**
 * Higher-order component that wraps a component with an error boundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

export { ErrorBoundary, PageErrorBoundary } from './error-boundary';
