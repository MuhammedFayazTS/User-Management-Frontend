import { useErrorStore } from "@/store/client";
import { Error500 } from "./pages/Error500";
import { Error404 } from "./pages/Error404";

const ErrorDisplay = () => {
    const { errorMessage, errorCode } = useErrorStore();
    if (!errorMessage) return null;

    switch (errorCode) {
        case 500:
            return <Error500 />;
        case 400:
            return <Error404 customClass="h-screen" />;
        default:
            return <Error404 customClass="h-screen" />;
    }
};

export default ErrorDisplay;
