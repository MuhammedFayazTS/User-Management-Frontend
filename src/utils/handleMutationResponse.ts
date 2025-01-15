import { handleAxiosError } from "@/api/api-error";
import { toast } from "@/hooks/use-toast";

type CallbackFunction = () => void;

export const handleMutationError = (
  error: unknown,
  callbackFN?: CallbackFunction
): void => {
  const { statusCode, message } = handleAxiosError(error);
  console.log({ statusCode, error });

  toast({
    title: "Error",
    description: message,
    variant: "destructive",
  });

  if (callbackFN) {
    callbackFN();
  }
};

export const handleSuccessResponse = (
  showToast: boolean,
  message?: string,
  callbackFN?: CallbackFunction
) => {
  if (showToast && message) {
    toast({
      title: message,
      variant: "default",
    });
  }

  if (callbackFN) {
    callbackFN();
  }
};
