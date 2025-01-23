import { Expand, Shrink, Upload, X } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import clsx from "clsx";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { FieldValues, UseFormReturn, Path } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import Layout from "../core/Layout";

interface IFileUploadCardProps<TFormValues extends FieldValues> {
    name: Path<TFormValues>;
    title?: string;
    control: UseFormReturn<TFormValues>["control"];
    description?: string;
    width?: number;
    customClass?: string;
    readOnly?: boolean;
}

const FileUploadCard = <TFormValues extends FieldValues>({
    control,
    name,
    title = "Image Upload",
    description,
    width,
    readOnly = false,
    customClass,
}: IFileUploadCardProps<TFormValues>) => {
    const [fit, setFit] = useState(false)
    const cardClasses = clsx(
        width ? `w-[${width}px]` : 'w-full',
        customClass,
        'overflow-hidden'
    );

    const toggleFit = () => setFit(prev => !prev)

    const fallBackImage = "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {

                const imagePath = field.value
                    ? (typeof field.value === "string"
                        ? field.value
                        : URL.createObjectURL(field.value))
                    : fallBackImage

                return (
                    <FormItem>
                        <FormControl>
                            <Card className={cardClasses}>
                                <CardHeader>
                                    <CardTitle>{title}</CardTitle>
                                    <CardDescription>{description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-2">
                                        <div className="relative">
                                            <img
                                                alt="Product image"
                                                className={`aspect-square w-full rounded-md object-${fit ? "contain" : "cover"}`}
                                                onError={(e) => {
                                                    e.currentTarget.src = fallBackImage;
                                                  }}
                                                src={imagePath} />
                                            {field.value &&
                                                <Layout gap={1} width={"fit"} className="absolute right-1 top-1">
                                                    <Button
                                                        type="button"
                                                        variant={"ghost"}
                                                        onClick={toggleFit}
                                                    >
                                                        {fit ?
                                                            <Expand /> :
                                                            <Shrink />
                                                        }
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant={"destructive"}
                                                        onClick={() => field.onChange(null)}>
                                                        <X />
                                                    </Button>
                                                </Layout>
                                            }
                                        </div>
                                        <div className="grid grid-cols-1 gap-2">
                                            <label className="flex w-full items-center justify-center rounded-md border border-dashed cursor-pointer p-3 hover:border-gray-400">
                                                <Upload className="h-4 w-4 text-muted-foreground" />
                                                <span className="sr-only">Upload</span>
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            field.onChange(file)
                                                        }
                                                    }}
                                                    className="hidden"
                                                    readOnly={readOnly}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    );
};

export { FileUploadCard };
