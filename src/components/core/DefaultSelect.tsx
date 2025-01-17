import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";

export type SelectOption = {
    label: string;
    value: number;
};

interface IDefaultSelectProps<TFormValues extends FieldValues> {
    name: Path<TFormValues>;
    control: UseFormReturn<TFormValues>["control"];
    label?: string;
    placeholder?: string;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    message?: string;
    options?: SelectOption[];
    isLoading?: boolean;
    disabled?: boolean;
    onChangeCallback?: (value: number | null) => void; // Callback for handling value changes
}

export const DefaultSelect = <TFormValues extends FieldValues>({
    name,
    control,
    label,
    placeholder = "Select an option",
    width = "100%",
    minWidth,
    maxWidth,
    message,
    options = [],
    isLoading = false,
    disabled = false,
    onChangeCallback,
}: IDefaultSelectProps<TFormValues>) => {
    const [search, setSearch] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    const filteredOptions = search
        ? options.filter((option) =>
            option.label.toLowerCase().startsWith(search.toLowerCase())
        ) || []
        : options;

    useEffect(() => {
        // Focus the input field when the dropdown opens
        const handleFocus = () => {
            inputRef.current?.focus();
        };

        document.addEventListener("mousedown", handleFocus);

        return () => {
            document.removeEventListener("mousedown", handleFocus);
        };
    }, []);

    return (
        <FormField
            control={control}
            name={name}
            disabled={disabled}
            render={({ field }) => {
                const handleValueChange = (value: string | undefined) => {
                    const numberValue = value ? parseInt(value, 10) : null;
                    field.onChange(numberValue);
                    if (onChangeCallback) {
                        onChangeCallback(numberValue);
                    }
                };

                const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target?.value || "";
                    setSearch(value);
                };

                return (
                    <FormItem
                        className="flex flex-col"
                        style={{ width, minWidth, maxWidth }}
                    >
                        {label && <FormLabel>{label}</FormLabel>}
                        {isLoading ? (
                            <Skeleton
                                className={`h-10 ${width ? `w-${width}` : "w-full"
                                    }`}
                            />
                        ) : (
                            <>
                                <Select
                                    onValueChange={handleValueChange}
                                    defaultValue={field.value?.toString()}
                                    onOpenChange={() => {
                                        setSearch("");
                                        inputRef.current?.focus();
                                    }}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder={placeholder}
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent side="bottom">
                                        <SelectGroup>
                                            <Input
                                                ref={inputRef}
                                                type="text"
                                                onChange={handleSearch}
                                                placeholder="Search..."
                                            />
                                            <SelectSeparator />
                                        </SelectGroup>
                                        {filteredOptions &&
                                            filteredOptions?.length > 0 ? (
                                            <SelectGroup>
                                                {filteredOptions.map(
                                                    (option) => (
                                                        <SelectItem
                                                            key={option.value}
                                                            value={option.value?.toString()}
                                                            className="flex justify-between items-center"
                                                        >
                                                            {option.label}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectGroup>
                                        ) : (
                                            <div className="px-4 py-2 text-sm text-gray-500">
                                                No options available
                                            </div>
                                        )}
                                    </SelectContent>
                                </Select>
                                {message && (
                                    <FormDescription>{message}</FormDescription>
                                )}
                                <FormMessage />
                            </>
                        )}
                    </FormItem>
                );
            }}
        />
    );
};
