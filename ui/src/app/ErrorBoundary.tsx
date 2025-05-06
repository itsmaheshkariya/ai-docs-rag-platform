import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackUI?: ReactNode; // Custom fallback UI
  logErrorToService?: (error: Error, errorInfo: string) => void; // Optional error logging function
  retryOnError?: boolean; // Optional retry on error
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static defaultProps = {
    fallbackUI: <h1>Something went wrong. 😔</h1>,
    retryOnError: true,
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null, retryCount: 0 };
  }

  componentDidCatch(error: Error, errorInfo: any): void {
    this.setState({ error, errorInfo });
    if (this.props.logErrorToService) {
      this.props.logErrorToService(error, errorInfo.componentStack);
    }
    console.error('Error captured:', error, errorInfo);
  }

  // Handle retry logic if needed
  handleRetry = (): void => {
    this.setState({ hasError: false, retryCount: this.state.retryCount + 1 });
  };

  // Handle edge cases based on error type (e.g., network errors)
  renderErrorDetails = () => {
    const { error, errorInfo } = this.state;
    if (error && error.message === 'NetworkError') {
      return (
        <>
          <h2>Network Error 🛑</h2>
          <p>It seems like you're having network issues.</p>
          <button onClick={this.handleRetry}>Retry</button>
        </>
      );
    }

    if (error && error.message === 'TimeoutError') {
      return (
        <>
          <h2>Timeout Error ⏱️</h2>
          <p>The operation timed out. Please try again.</p>
          <button onClick={this.handleRetry}>Retry</button>
        </>
      );
    }

    return (
      <>
        <h2>Oops! Something went wrong 😞</h2>
        <details style={{ whiteSpace: 'pre-wrap' }}>
          {error && error.toString()}
          <br />
          {errorInfo && errorInfo.componentStack}
        </details>
        <button onClick={this.handleRetry}>Retry</button>
      </>
    );
  };

  render() {
    const { hasError, retryCount } = this.state;
    const { fallbackUI, retryOnError } = this.props;

    if (hasError) {
      // If retry is allowed and has been clicked
      if (retryOnError && retryCount > 0) {
        return <>{this.props.children}</>;
      }

      return (
        <div>
          {this.renderErrorDetails()}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;