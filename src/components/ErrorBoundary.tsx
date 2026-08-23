import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('🛡️ SkillPods Crash Defense Caught Exception:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    localStorage.removeItem('skillpods_page');
    window.location.hash = '';
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#08070d] text-white flex items-center justify-center p-6 font-sans">
          <div className="max-w-lg w-full bg-[#13101f] border border-rose-500/30 rounded-3xl p-8 shadow-2xl space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-black tracking-tight text-white">Runtime Exception Recovered</h2>
              <p className="text-sm text-slate-400">
                SkillPods crash defense intercepted an unexpected render issue. Your active session is preserved.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3.5 bg-black/60 rounded-xl border border-white/10 text-left overflow-x-auto">
                <code className="text-xs font-mono text-rose-300">
                  {this.state.error.toString()}
                </code>
              </div>
            )}

            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer font-bold shadow-lg shadow-purple-900/40"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleReset}
                className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 border border-white/10 transition-all cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Back to Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
