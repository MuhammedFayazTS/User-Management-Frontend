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
  
  export type SelectOption = {
    label: string;
    value: number;
  };
  
  interface IDefaultSelectProps<TFormValues extends FieldValues> {
    name: Path<TFormValues>;
    control: UseFormReturn<TFormValues>["control"];
    label?: string;
    placeholder?: string;
    width?: number | "full";
    minWidth?: number | "full";
    maxWidth?: number | "full";
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
    width,
    minWidth,
    maxWidth,
    message,
    options,
    isLoading = false,
    disabled = false,
    onChangeCallback,
  }: IDefaultSelectProps<TFormValues>) => {
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
  
          return (
            <FormItem style={{ width, minWidth, maxWidth }}>
              {label && <FormLabel>{label}</FormLabel>}
              {isLoading ? (
                <Skeleton
                  className={`h-10 ${width ? `w-${width}` : "w-full"}`}
                />
              ) : (
                <>
                  <Select
                    onValueChange={handleValueChange}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={placeholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent side="bottom">
                      {options && options?.length > 0 ? (
                        <SelectGroup>
                          {options.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value.toString()}
                            >
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
          );
        }}
      />
    );
  };
  