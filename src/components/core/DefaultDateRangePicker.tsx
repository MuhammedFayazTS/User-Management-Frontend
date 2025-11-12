"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface IDefaultDateRangePickerProps<TFormValues extends FieldValues> {
    name: Path<TFormValues>;
    control: UseFormReturn<TFormValues>["control"];
    label?: string;
    placeholder?: string;
    width?: number;
    readOnly?: boolean;
    onChange: (from: Date | null, to: Date | null) => void;
}

const DefaultDateRangePicker = <TFormValues extends FieldValues>({
    control,
    name,
    label,
    placeholder = "Pick a date range",
    width,
    readOnly = false,
    onChange,
}: IDefaultDateRangePickerProps<TFormValues>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                const dateRange = field.value as DateRange | undefined;

                const handleDateChange = (selected: DateRange | undefined) => {
                    if (selected) {
                        onChange(selected.from ?? null,
                            selected.to ?? null)
                    }
                };

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
                                            (!dateRange?.from && !dateRange?.to) && "text-muted-foreground",
                                            readOnly && "cursor-not-allowed opacity-50"
                                        )}
                                        disabled={readOnly}
                                    >
                                        <CalendarIcon className="mr-2" />
                                        {dateRange?.from ? (
                                            dateRange.to ? (
                                                `${format(dateRange.from, "LLL dd, y")} - ${format(dateRange.to, "LLL dd, y")}`
                                            ) : (
                                                format(dateRange.from, "LLL dd, y")
                                            )
                                        ) : (
                                            <span>{placeholder}</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        initialFocus
                                        mode="range"
                                        defaultMonth={dateRange?.from}
                                        selected={dateRange}
                                        onSelect={handleDateChange}
                                        numberOfMonths={2}
                                    />
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

export default DefaultDateRangePicker;
