import React from 'react';
import styles from './Checkbox.module.scss';

type CheckboxProps = {
    checked: boolean;
    disabled?: boolean;
    label: string;
    onChange: any;
    value: number | string;
};

export function Checkbox(props: CheckboxProps) {
    const { checked, disabled, label, onChange, value } = props;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(parseInt(e.target.value));
    };

    return (
        <label className={styles.label}>
            {label}
            <input type="checkbox" onChange={handleChange} value={value} checked={checked} disabled={disabled} />
            <span className={styles.checkmark}></span>
        </label>
    );
}
