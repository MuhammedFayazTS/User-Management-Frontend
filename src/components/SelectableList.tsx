import { Loader } from "lucide-react";
import { Checkbox } from "./ui/checkbox";

interface BaseItem {
    id: number;
    name?: string;
}

interface SelectableListProps<T extends BaseItem> {
    isLoading: boolean;
    data: T[];
    isSelected: (id: number) => boolean;
    handleChange: (item: T) => void;
    isViewPage: boolean;
}

export const SelectableList = <T extends BaseItem>({
    isLoading,
    data,
    isSelected,
    handleChange,
    isViewPage,
}: SelectableListProps<T>) => {
    if (isLoading) {
        return <Loader className="animate-spin" />;
    }

    return (
        <div className="grid grid-cols-4 gap-3">
            {data.map((item) => (
                <div key={item.id} className="flex items-center space-x-2 border rounded p-5">
                    <Checkbox
                        id={`${item.id}`}
                        checked={isSelected(item.id)}
                        onClick={() => handleChange(item)}
                        disabled={isViewPage}
                    />
                    <label
                        htmlFor={`${item.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {("firstName" in item && "lastName" in item)
                            ? `${item.firstName} ${item.lastName}`
                            : "name" in item
                                ? item.name
                                : ""}
                    </label>
                </div>
            ))}
        </div>
    );
};
