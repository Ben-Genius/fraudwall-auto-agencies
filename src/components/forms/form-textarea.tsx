import { useFormContext } from 'react-hook-form';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    label?: string;
    description?: string;
    className?: string;
}

/**
 * A wrapper around Shadcn's Textarea component for use with React Hook Form.
 */
export const FormTextArea = ({
    name,
    label,
    description,
    className,
    ...props
}: FormTextAreaProps) => {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn('w-full', className)}>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Textarea {...field} {...props} />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
