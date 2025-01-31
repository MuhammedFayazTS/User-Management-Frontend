import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock, ArrowLeft } from "lucide-react";
import { useErrorStore } from "@/store/client";

const Error403: FC = () => {
    const { resetError } = useErrorStore();
    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
            <Lock className="w-16 h-16 text-red-500 mb-4 animate-pulse" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-200 mb-2">Access Denied</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-3">You do not have permission to view this page.</p>

            <Button onClick={resetError} asChild className="mt-3">
                <Link to="/home">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Return Home
                </Link>
            </Button>
        </div>
    );
};

export { Error403 };
