import { ChangeEvent } from 'react';
import classes from './customInput.module.css';

export default function CustomInput({
    type,
    onChange,
    value,
    placeholder,
    required = false
}: {
    classname?: string,
    type?: string,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
    value?: any,
    placeholder?: string,
    required?: boolean
}) {
    return <div className={classes.inputContainer}>
        <input
        type={type ?? 'text'}
        value={value ?? undefined}
        onChange={onChange}
        required={required}
        />
        {
            placeholder
            && <span className={classes.floatingLabel}>{placeholder}</span>
        }
    </div>
}