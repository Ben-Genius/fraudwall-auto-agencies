import { useFormContext } from 'react-hook-form';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    description?: string;
    className?: string;
}

/**
 * A wrapper around Shadcn's Input component for use with React Hook Form.
 */
export const FormInput = ({
    name,
    label,
    description,
    className,
    ...props
}: FormInputProps) => {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn('w-full', className)}>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Input {...field} {...props} />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
