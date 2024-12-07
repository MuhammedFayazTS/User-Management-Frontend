import { useQuery } from "@tanstack/react-query";
import { getUserSessionQueryFn } from "@/api/auth.service";

const useAuth = () => {
  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: getUserSessionQueryFn,
    staleTime: Infinity,
    retry: 1,
  });
  return query;
};

export default useAuth;