import ErrorBoundary from './ErrorBoundary';
import type { ErrorBoundaryBaseProps } from './ErrorBoundaryBase';

import { Suspense, type SuspenseProps } from 'react';

interface ErrorBoundaryWithSuspenseProps extends Omit<ErrorBoundaryBaseProps, 'fallback'> {
  errorFallback?: ErrorBoundaryBaseProps['fallback'];
  loadingFallback?: SuspenseProps['fallback'];
}

const ErrorBoundaryWithSuspense = ({
  errorFallback,
  loadingFallback,
  onError,
  children,
}: ErrorBoundaryWithSuspenseProps) => {
  return (
    <ErrorBoundary fallback={errorFallback} onError={onError}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWithSuspense;
