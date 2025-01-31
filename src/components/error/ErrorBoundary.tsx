import { useErrorStore } from "@/store/client";
import { Component, ReactNode } from "react";
import ErrorDisplay from "./ErrorDisplay";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error) {
        // If no specific error message is available, set error code to 404
        if (!error.message) {
            useErrorStore.getState().setError("Page not found", 404);
        } else {
            useErrorStore.getState().setError(error.message, 500);
        }
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        // Listen for changes in the error store and reset hasError accordingly
        const { errorMessage } = useErrorStore.getState();

        // If errorMessage is cleared, reset the hasError state
        if (prevState.hasError && !errorMessage) {
            this.setState({ hasError: false });
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="fixed top-0 left-0 w-full h-full bg-background bg-opacity-50 z-50 flex justify-center items-center">
                    <ErrorDisplay />
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
