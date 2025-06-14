"use client";

import React from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';


function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="error-boundary-container">
      <div className="error-boundary-card">
        <h2 className="error-boundary-title">
          Something went wrong
        </h2>
        <div className="error-boundary-message">
          {error.message}
        </div>
        <button
          onClick={resetErrorBoundary}
          className="error-boundary-button"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

interface WithErrorBoundaryOptions extends Omit<React.ComponentProps<typeof ErrorBoundary>, 'fallback' | 'FallbackComponent' | 'fallbackRender'> {
  onReset?: (details?: { reason: "imperative-api"; args: unknown[]; } | { reason: "keys"; prev: unknown[] | undefined; next: unknown[] | undefined; }) => void;
}

export function withErrorBoundary<P>(Component: React.ComponentType<P>, options: WithErrorBoundaryOptions = {}) {
  return function WithErrorBoundary(props: P & React.Attributes) {
    const { onReset, ...restOptions } = options;
    return (
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={(details) => {
          if (onReset) {
            onReset(details);
          }
        }}
        {...restOptions}
      >
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

interface AppErrorBoundaryProps {
  children: React.ReactNode;
}

export default function AppErrorBoundary({ children }: AppErrorBoundaryProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}
