import axios from 'axios';

export const handleAxiosError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status || error.code || 'UNKNOWN_ERROR';
        const message =
            error.response?.data?.message || // API-provided error message
            error.message || // Axios default error message
            'An unknown error occurred';

        return {
            statusCode,
            message,
        };
    }

    // Fallback for non-Axios errors
    return {
        statusCode: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred',
    };
};
