import { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

export interface InputProps
    extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
        error?: FieldError;
}
