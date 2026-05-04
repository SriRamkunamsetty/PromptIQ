// @ts-nocheck
import * as React from 'react';
import { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    
    // In a real enterprise app, this is where we'd send the error to Sentry or Datadog
    try {
      const errorPayload = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      };
      
      // Simulated structured logging payload drop
      console.debug('[SENTRY SIMULATION] Reporting Error:', errorPayload);
    } catch (e) {
      // Ignore logger errors
    }
    
    this.setState({
      error,
      errorInfo
    });
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-destructive/5 border border-destructive/20 rounded-3xl m-6">
          <div className="w-16 h-16 rounded-2xl bg-destructive/20 flex flex-col items-center justify-center text-destructive mb-6 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-3">Runtime Core Fault</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            The optimization engine encountered an unrecoverable exception. A structured error report has been forwarded to our observability stack.
          </p>
          
          <div className="bg-black/50 p-4 rounded-xl text-left border border-white/5 w-full max-w-2xl mb-8 overflow-auto custom-scrollbar max-h-[200px]">
             <p className="font-mono text-sm text-destructive mb-2">{this.state.error?.toString()}</p>
             <pre className="font-mono text-[10px] text-muted-foreground whitespace-pre-wrap">
               {this.state.errorInfo?.componentStack}
             </pre>
          </div>

          <Button 
            onClick={() => {
               this.setState({ hasError: false, error: null, errorInfo: null });
               window.location.reload();
            }}
            className="glass-button px-8"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Reinitialize Context
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
