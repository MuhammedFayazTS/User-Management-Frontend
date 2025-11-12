"use client"

import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { DefaultTimePicker } from "./DefaultTimePicker";

interface IDefaultDatePickerProps<TFormValues extends FieldValues> {
    name: Path<TFormValues>;
    control: UseFormReturn<TFormValues>["control"];
    label?: string;
    placeholder?: string;
    width?: number;
    readOnly?: boolean;
    withTime?: boolean;
}

const DefaultDatePicker = <TFormValues extends FieldValues>({
    control,
    name,
    label,
    placeholder = "Pick a date",
    width,
    readOnly = false,
    withTime = false,
}: IDefaultDatePickerProps<TFormValues>) => {

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                const date = field.value ? new Date(field.value) : undefined;
                return (
                    <FormItem style={{ width: width || "100%" }}>
                        {label && <FormLabel className="dark:text-[#f1f7feb5] text-sm">{label}</FormLabel>}
                        <FormControl>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !date && "text-muted-foreground",
                                            readOnly && "cursor-not-allowed opacity-50"
                                        )}
                                        disabled={readOnly}
                                    >
                                        <CalendarIcon className="mr-2" />
                                        {date ? (
                                            withTime ? (
                                                `${format(date, "PPP p")}`
                                            ) : (
                                                `${format(date, "PPP")}`
                                            )
                                        ) : (
                                            <span>{placeholder}</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-2 space-y-2" align="start">
                                    <Calendar
                                        mode="single"
                                        defaultMonth={date}
                                        selected={date}
                                        onSelect={(selected) => {
                                            field.onChange(selected);
                                        }}
                                        initialFocus
                                    />

                                    {withTime && (
                                        <div className="p-3 border-t border-border">
                                            <DefaultTimePicker
                                                setDate={field.onChange}
                                                date={field.value}
                                            />
                                        </div>
                                    )}
                                </PopoverContent>
                            </Popover>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
};

export default DefaultDatePicker;
