import { useFormContext } from 'react-hook-form';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface FormCheckboxProps {
    name: string;
    label: string;
    description?: string;
    className?: string;
    disabled?: boolean;
}

/**
 * A wrapper around Shadcn's Checkbox component for use with React Hook Form.
 */
export const FormCheckbox = ({
    name,
    label,
    description,
    className,
    disabled,
}: FormCheckboxProps) => {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn('flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4', className)}>
                    <FormControl>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={disabled}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>{label}</FormLabel>
                        {description && <FormDescription>{description}</FormDescription>}
                        <FormMessage />
                    </div>
                </FormItem>
            )}
        />
    );
};
