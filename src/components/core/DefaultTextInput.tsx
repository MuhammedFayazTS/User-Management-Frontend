import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

type InputType = "text" | "email" | "password" | "number";

interface IDefaultTextInputProps<TFormValues extends FieldValues> {
    name: Path<TFormValues>;
    control: UseFormReturn<TFormValues>["control"];
    label?: string;
    type?: InputType;
    placeholder?: string;
    autoComplete?: 'off' | 'on'
    width?: number
    readOnly?: boolean
}

const DefaultTextInput = <TFormValues extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    type = "text",
    autoComplete,
    width,
    readOnly = false,
}: IDefaultTextInputProps<TFormValues>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem style={{ width: width || '100%' }}>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">{label}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} type={type} autoComplete={autoComplete} readOnly={readOnly} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default DefaultTextInput;
