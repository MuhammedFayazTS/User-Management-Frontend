import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Skeleton } from "../ui/skeleton";

type Option = {
    label: string;
    value: string;
};

interface IDefaultSelectProps<TFormValues extends FieldValues> {
    name: Path<TFormValues>;
    control: UseFormReturn<TFormValues>["control"];
    label?: string;
    placeholder?: string;
    width?: number | 'full';
    minWidth?: number | 'full';
    maxWidth?: number | 'full';
    message?: string;
    options: Option[];
    isLoading?: boolean;
    disabled?: boolean;
}

export const DefaultSelect = <TFormValues extends FieldValues>({
    name,
    control,
    label,
    placeholder = "Select an option",
    width,
    minWidth,
    maxWidth,
    message,
    options,
    isLoading = false,
    disabled = false,
}: IDefaultSelectProps<TFormValues>) => {
    return (
        <FormField
            control={control}
            name={name}
            disabled={disabled}
            render={({ field }) => (
                <FormItem style={{ width, minWidth, maxWidth }}>
                    {label && <FormLabel>{label}</FormLabel>}
                    {isLoading ? (
                        <Skeleton className={`h-10 ${width ? `w-${width}` : "w-full"}`} />
                    ) : (
                        <>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={placeholder} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {options.length > 0 ? (
                                        <SelectGroup>
                                            {options.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    ) : (
                                        <SelectGroup>
                                            <SelectItem value="" disabled>
                                                No options available
                                            </SelectItem>
                                        </SelectGroup>
                                    )}
                                </SelectContent>
                            </Select>
                            {message && <FormDescription>{message}</FormDescription>}
                            <FormMessage />
                        </>
                    )}
                </FormItem>
            )}
        />
    );
};
