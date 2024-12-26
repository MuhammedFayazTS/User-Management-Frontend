import { IBreadcrumb, useHeaderContext } from "@/context/header-provider";
import { useEffect } from "react";

interface IBreadcrumbs {
  title: string;
  parentModules?: IBreadcrumb[];
  isLoading?: boolean;
}

const useBreadcrumbs = ({
  title,
  parentModules = [],
  isLoading = false,
}: IBreadcrumbs) => {
  const { setBreadcrumbs, setIsLoading } = useHeaderContext();

  useEffect(() => {
    const currentPage = {
      title,
    };
    setBreadcrumbs([...parentModules, currentPage]);
    return () => {
      setBreadcrumbs([]);
    };
  }, [parentModules, setBreadcrumbs, title]);

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  return null;
};

export default useBreadcrumbs;
