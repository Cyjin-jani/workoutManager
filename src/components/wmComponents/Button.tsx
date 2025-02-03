import type { ButtonProps } from '@/components/ui/button';
import { Button } from '@/components/ui/button';

export function MyButton({ children, ...props }: ButtonProps) {
  return <Button {...props}>{children}</Button>;
}
