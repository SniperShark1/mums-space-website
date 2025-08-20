import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-mums-pink flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-lg">
            <h2 className="text-2xl font-bold text-mums-dark mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-6">
              We're sorry, but something unexpected happened. Please refresh the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-mums-accent hover:bg-mums-dark text-white px-6 py-2 rounded-full transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}