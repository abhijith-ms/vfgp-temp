"use client";

import { Component, type ReactNode } from "react";

interface CanvasErrorBoundaryProps {
  onError: () => void;
  children: ReactNode;
}

// Catches WebGL/Canvas init failures and hands off to the caller (which
// swaps in ProcessStoryFallback) instead of crashing the page.
export default class CanvasErrorBoundary extends Component<CanvasErrorBoundaryProps, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}
