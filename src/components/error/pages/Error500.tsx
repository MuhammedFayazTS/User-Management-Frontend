import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { useErrorStore } from "@/store/client";

const Error500: FC = () => {
    const { resetError } = useErrorStore();
    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
            <AlertTriangle className="w-16 h-16 text-red-500 mb-4 animate-pulse mt-auto" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-500 mb-2">System Error</h1>
            <p className="text-lg text-gray-500 dark:text-gray-300">Something went wrong! Please try again later.</p>
            <Button onClick={resetError} asChild className="mt-6">
                <Link to="/home">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Return Home
                </Link>
            </Button>
            <p className="text-base text-yellow-700 dark:text-yellow-700 mt-auto">If the issue still exist contact support team!!</p>
        </div>
    );
};

export { Error500 };
