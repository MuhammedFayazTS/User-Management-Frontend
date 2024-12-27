import React, { useCallback } from "react";
import { Loader } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { revokeMFAMutationFn } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { handleAxiosError } from "@/api/api-error";

const RevokeMfa = () => {
    const queryClient = useQueryClient();
    
    const { mutate, isPending } = useMutation({
        mutationFn: revokeMFAMutationFn,
    onSuccess: (response: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
      queryClient.invalidateQueries({
        queryKey: ["authUser"],
      });
      toast({
        title: "Success",
        description: response.message,
      });
    },
    onError: (error) => {
        const { statusCode, message } = handleAxiosError(error);
        console.log({ statusCode, error });
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
    },
  });

  const handleClick = useCallback(() => {
    mutate();
  }, []);

  return (
    <Button
      disabled={isPending}
      className="h-[35px] !text-[#c40006d3] !bg-red-100 shadow-none mr-1"
      onClick={handleClick}
    >
      {isPending && <Loader className="animate-spin" />}
      Revoke Access
    </Button>
  );
};

export default RevokeMfa;