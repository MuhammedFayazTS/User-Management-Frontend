import { createContext, useContext, useState } from "react";

export interface IBreadcrumb {
    title: string;
    isSeparator?: boolean;
    to?: string
}

interface IAppHeader {
    breadcrumbs?: IBreadcrumb[];
    isLoading?: boolean;
}

interface IHeaderContext extends IAppHeader {
    setBreadcrumbs: (breadcrumbs: IBreadcrumb[]) => void;
    setIsLoading: (isLoading: boolean) => void;
}

const HeaderContext = createContext<IHeaderContext | undefined>(undefined);

export const HeaderProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [breadcrumbs, setBreadcrumbs] = useState<IBreadcrumb[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <HeaderContext.Provider
            value={{
                breadcrumbs,
                isLoading,
                setBreadcrumbs,
                setIsLoading,
            }}
        >
            {children}
        </HeaderContext.Provider>
    );
};

export const useHeaderContext = () => {
    const context = useContext(HeaderContext);
    if (!context) {
        throw new Error("useHeaderContext must be used within a HeaderProvider");
    }
    return context;
};
