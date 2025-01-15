import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";

interface IDefaultTextAreaProps<TFormValues extends FieldValues> {
    name: Path<TFormValues>;
    control: UseFormReturn<TFormValues>["control"];
    label?: string;
    placeholder?: string;
    autoComplete?: 'off' | 'on',
    width?: number
    readOnly?: boolean
}

const DefaultTextArea = <TFormValues extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    autoComplete,
    width,
    readOnly = false,
}: IDefaultTextAreaProps<TFormValues>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem style={{ width: width || '100%' }}>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">{label}</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder={placeholder}
                            autoComplete={autoComplete}
                            readOnly={readOnly}
                            {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default DefaultTextArea;
