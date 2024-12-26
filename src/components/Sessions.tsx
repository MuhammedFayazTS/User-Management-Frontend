import { useMutation, useQuery } from "@tanstack/react-query";
import SessionItem from "./SessionItem";
import { sessionsQueryFn, sessionDelMutationFn } from "@/api/auth.service";
import { Loader } from "lucide-react";
import { useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import { handleAxiosError } from "@/api/api-error";
import Page from "@/layout/PageLayout";
import { getParentModuleBreadcrumb, ParentModules } from "@/utils/breadcrumb-modules-helper";

const Sessions = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["sessions"],
    queryFn: sessionsQueryFn,
    staleTime: Infinity,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: sessionDelMutationFn,
  });

  const sessions = data?.sessions || [];
  const currentSession = sessions?.find((session) => session.isCurrent);
  const othersSessions = sessions?.filter(
    (session) => session.isCurrent !== true
  );

  const handleDelete = useCallback(
    (id: string) => {
      mutate(id, {
        onSuccess: () => {
          refetch();
          toast({
            title: "Success",
            description: "Session removed successfully",
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
    },
    [mutate, refetch]
  );

  return (
    <Page
      title="Sessions"
      breadcrumbsTitle="Sessions"
      className="via-root to-root rounded-xl bg-gradient-to-r p-6"
      parentModules={getParentModuleBreadcrumb(ParentModules.ACCOUNT)}
    >
      <p className="mb-6 max-w-xl text-sm text-[#0007149f] dark:text-gray-100 font-normal">
        Sessions are the devices you are using or that have used your Nexus Flow
        These are the sessions where your account is currently logged in. You
        can log out of each session.
      </p>

      {isLoading ? (
        <Loader size="35px" className="animate-spin" />
      ) : (<div className="rounded-t-xl max-w-xl">
        <div>
          <h5 className="text-base font-semibold">Current active session</h5>
          <p className="mb-6 text-sm text-[#0007149f] dark:text-gray-100">
            You’re logged into this Nexus Flow account on this device and are
            currently using it.
          </p>
        </div>
        <div className="w-full">
          {currentSession && (
            <div className="w-full py-2 border-b pb-5">
              <SessionItem
                userAgent={currentSession.userAgent}
                date={currentSession.createdAt}
                expiresAt={currentSession.expiresAt}
                isCurrent={currentSession.isCurrent}
              />
            </div>
          )}
          <div className="mt-4">
            <h5 className="text-base font-semibold">Other sessions</h5>
            <ul className="mt-4">
              {othersSessions?.map((session) => (
                <li key={session.id}>
                  <SessionItem
                    loading={isPending}
                    userAgent={session.userAgent}
                    expiresAt={session.expiresAt}
                    date={session.createdAt}
                    onRemove={() => handleDelete(session.id)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>)
      }
    </Page>
  );
};

export default Sessions;