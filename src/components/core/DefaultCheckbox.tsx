import { Checkbox } from "@/components/ui/checkbox";
import {
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface IDefaultCheckboxProps<TFormValues extends FieldValues> {
    name: Path<TFormValues>;
    label: string;
    description?: string;
    disabled?: boolean;
    control: UseFormReturn<TFormValues>["control"];
}

export const DefaultCheckbox = <TFormValues extends FieldValues>({
    name,
    label,
    description,
    disabled = false,
    control,
}: IDefaultCheckboxProps<TFormValues>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                        <Checkbox
                            disabled={disabled}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className="grid gap-1.5 leading-none">
                        <FormLabel>{label}</FormLabel>
                        {description && (
                            <p className="text-sm text-muted-foreground">{description}</p>
                        )}
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
