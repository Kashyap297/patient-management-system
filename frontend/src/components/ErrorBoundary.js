import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="flex items-center justify-center h-screen text-red-500">Something went wrong.</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
